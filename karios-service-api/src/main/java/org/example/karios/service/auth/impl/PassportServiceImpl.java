package org.example.karios.service.auth.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import io.jsonwebtoken.Claims;
import java.time.LocalDateTime;
import org.example.karios.common.BusinessException;
import org.example.karios.common.ErrorCode;
import org.example.karios.entity.UserAuthBindingEntity;
import org.example.karios.entity.UserEntity;
import org.example.karios.entity.UserSessionEntity;
import org.example.karios.entity.UserTermsConsentEntity;
import org.example.karios.gateway.JwtTokenProvider;
import org.example.karios.mapper.UserAuthBindingMapper;
import org.example.karios.mapper.UserMapper;
import org.example.karios.mapper.UserSessionMapper;
import org.example.karios.mapper.UserTermsConsentMapper;
import org.example.karios.model.bo.auth.LoginCommand;
import org.example.karios.model.bo.auth.LoginResult;
import org.example.karios.model.response.auth.AuthTokensResponse;
import org.example.karios.model.response.auth.RefreshTokenResponse;
import org.example.karios.service.auth.PassportService;
import org.example.karios.service.auth.SessionSlideService;
import org.example.karios.service.user.UserConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 统一登录/注册（Passport）：按 provider + providerUserId 查绑定，新用户建号并发 Token。
 */
@Service
public class PassportServiceImpl implements PassportService {

    private final UserMapper userMapper;
    private final UserAuthBindingMapper bindingMapper;
    private final UserTermsConsentMapper consentMapper;
    private final UserSessionMapper sessionMapper;
    private final JwtTokenProvider jwtTokenProvider;
    private final SessionSlideService sessionSlideService;

    public PassportServiceImpl(
            UserMapper userMapper,
            UserAuthBindingMapper bindingMapper,
            UserTermsConsentMapper consentMapper,
            UserSessionMapper sessionMapper,
            JwtTokenProvider jwtTokenProvider,
            SessionSlideService sessionSlideService) {
        this.userMapper = userMapper;
        this.bindingMapper = bindingMapper;
        this.consentMapper = consentMapper;
        this.sessionMapper = sessionMapper;
        this.jwtTokenProvider = jwtTokenProvider;
        this.sessionSlideService = sessionSlideService;
    }

    /** 凭证首次出现则注册；否则校验账号状态并更新最近登录时间。 */
    @Override
    @Transactional
    public LoginResult loginOrRegister(LoginCommand command) {
        UserAuthBindingEntity binding = bindingMapper.selectOne(
                new LambdaQueryWrapper<UserAuthBindingEntity>()
                        .eq(UserAuthBindingEntity::getProvider, command.getProvider())
                        .eq(UserAuthBindingEntity::getProviderUserId, command.getProviderUserId())
                        .last("LIMIT 1"));

        boolean isNewUser = false;
        UserEntity user;

        if (binding == null) {
            isNewUser = true;
            user = new UserEntity()
                    .setNickname(command.getSuggestedNickname())
                    .setProfileStatus("incomplete")
                    .setPrimaryCredential(command.getPrimaryCredential())
                    .setStatus("active")
                    .setVerified(false)
                    .setLastLoginAt(LocalDateTime.now());
            userMapper.insert(user);

            UserAuthBindingEntity newBinding = new UserAuthBindingEntity()
                    .setUserId(user.getId())
                    .setProvider(command.getProvider())
                    .setProviderUserId(command.getProviderUserId());
            bindingMapper.insert(newBinding);

            insertConsent(user.getId(), command);
        } else {
            user = userMapper.selectById(binding.getUserId());
            if (user == null) {
                throw new BusinessException(ErrorCode.INTERNAL_ERROR, "用户数据异常");
            }
            if ("suspended".equals(user.getStatus())) {
                throw new BusinessException(ErrorCode.FORBIDDEN, "账号已被封禁");
            }
            if ("deleted".equals(user.getStatus())) {
                throw new BusinessException(ErrorCode.FORBIDDEN, "账号已注销");
            }
            userMapper.update(
                    null,
                    new LambdaUpdateWrapper<UserEntity>()
                            .eq(UserEntity::getId, user.getId())
                            .set(UserEntity::getLastLoginAt, LocalDateTime.now()));
            user.setLastLoginAt(LocalDateTime.now());
        }

        JwtTokenProvider.TokenPair tokenPair = createSessionAndTokens(user, command);

        AuthTokensResponse response = new AuthTokensResponse();
        response.setAccessToken(tokenPair.accessToken());
        response.setRefreshToken(tokenPair.refreshToken());
        response.setExpiresIn(tokenPair.expiresIn());
        response.setNewUser(isNewUser);
        response.setUser(UserConverter.toSummary(user));

        return LoginResult.builder().tokens(response).user(user).newUser(isNewUser).build();
    }

    /** 校验 Refresh JWT、Redis 与 DB 会话均未吊销后签发新 Access。 */
    @Override
    public RefreshTokenResponse refreshAccessToken(String refreshToken) {
        Claims claims;
        try {
            claims = jwtTokenProvider.parse(refreshToken);
        } catch (Exception ex) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED);
        }

        if (!JwtTokenProvider.TYPE_REFRESH.equals(claims.get(JwtTokenProvider.CLAIM_TYP, String.class))) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED);
        }

        Long userId = Long.parseLong(claims.getSubject());
        String refreshJti = claims.getId();
        if (!jwtTokenProvider.refreshExists(userId, refreshJti)) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED, "refresh token 已失效");
        }

        UserSessionEntity session = sessionMapper.selectOne(
                new LambdaQueryWrapper<UserSessionEntity>()
                        .eq(UserSessionEntity::getRefreshJti, refreshJti)
                        .last("LIMIT 1"));
        if (session == null || session.getRevokedAt() != null) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED, "会话已失效");
        }

        Long sessionId = claims.get(JwtTokenProvider.CLAIM_SID, Long.class);
        sessionSlideService.touchSession(sessionId);
        String accessToken = jwtTokenProvider.issueAccessOnly(userId, sessionId);
        String newRefresh = jwtTokenProvider.reissueRefreshToken(userId, sessionId, refreshJti);
        return new RefreshTokenResponse(
                accessToken,
                jwtTokenProvider.getAccessTtlSeconds(),
                newRefresh,
                jwtTokenProvider.getRefreshTtlDays());
    }

    @Override
    @Transactional
    public void logout(Long userId, String accessJti, String refreshToken) {
        // Access：写入 Redis 黑名单；Refresh：删 Redis 键并标记 user_sessions.revoked_at
        if (accessJti != null) {
            jwtTokenProvider.blacklist(accessJti, jwtTokenProvider.getAccessTtlSeconds());
        }
        if (refreshToken != null && !refreshToken.isBlank()) {
            try {
                Claims claims = jwtTokenProvider.parse(refreshToken);
                if (JwtTokenProvider.TYPE_REFRESH.equals(claims.get(JwtTokenProvider.CLAIM_TYP, String.class))) {
                    String refreshJti = claims.getId();
                    jwtTokenProvider.revokeRefresh(userId, refreshJti);
                    sessionMapper.update(
                            null,
                            new LambdaUpdateWrapper<UserSessionEntity>()
                                    .eq(UserSessionEntity::getRefreshJti, refreshJti)
                                    .set(UserSessionEntity::getRevokedAt, LocalDateTime.now()));
                }
            } catch (Exception ignored) {
                // ignore invalid refresh on logout
            }
        }
    }

    /** 写入 user_sessions 并签发 JWT（refresh_jti 与库表一致）。 */
    private JwtTokenProvider.TokenPair createSessionAndTokens(UserEntity user, LoginCommand command) {
        String refreshJti = java.util.UUID.randomUUID().toString().replace("-", "");

        UserSessionEntity session = new UserSessionEntity()
                .setUserId(user.getId())
                .setRefreshJti(refreshJti)
                .setDeviceId(command.getDeviceId())
                .setDeviceName(command.getDeviceName())
                .setPlatform(command.getPlatform())
                .setIp(command.getClientIp());
        sessionMapper.insert(session);

        return jwtTokenProvider.issueTokenPair(user.getId(), session.getId(), refreshJti);
    }

    /** 新用户注册时记录协议同意快照。 */
    private void insertConsent(Long userId, LoginCommand command) {
        UserTermsConsentEntity consent = new UserTermsConsentEntity()
                .setUserId(userId)
                .setTermsVersion(command.getTermsVersion())
                .setPrivacyVersion(
                        command.getPrivacyVersion() != null ? command.getPrivacyVersion() : command.getTermsVersion())
                .setClientIp(command.getClientIp())
                .setUserAgent(command.getUserAgent())
                .setDeviceId(command.getDeviceId());
        consentMapper.insert(consent);
    }
}
