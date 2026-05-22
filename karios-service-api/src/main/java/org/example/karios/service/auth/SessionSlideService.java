package org.example.karios.service.auth;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import java.time.Duration;
import java.time.LocalDateTime;
import org.example.karios.config.KairosProperties;
import org.example.karios.entity.UserSessionEntity;
import org.example.karios.gateway.JwtTokenProvider;
import org.example.karios.mapper.UserSessionMapper;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

/**
 * 滑动续期：用户活跃时延长 Redis 中 refresh 有效期，并更新会话 last_active_at。
 * <p>通过 Redis 节流，避免每个 API 请求都写库。
 */
@Service
public class SessionSlideService {

    private final UserSessionMapper sessionMapper;
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate redisTemplate;
    private final KairosProperties properties;

    public SessionSlideService(
            UserSessionMapper sessionMapper,
            JwtTokenProvider jwtTokenProvider,
            StringRedisTemplate redisTemplate,
            KairosProperties properties) {
        this.sessionMapper = sessionMapper;
        this.jwtTokenProvider = jwtTokenProvider;
        this.redisTemplate = redisTemplate;
        this.properties = properties;
    }

    /** 已登录用户发起 API 请求时调用（带节流）。 */
    public void touchOnActivity(Long sessionId) {
        if (sessionId == null || !properties.getAuth().getJwt().isSlideOnActivity()) {
            return;
        }
        String throttleKey = "session:slide:throttle:" + sessionId;
        Boolean first = redisTemplate.opsForValue().setIfAbsent(throttleKey, "1", Duration.ofMinutes(5));
        if (!Boolean.TRUE.equals(first)) {
            return;
        }
        touchSession(sessionId);
    }

    /** 刷新 Token 或登录后立即续期（不节流）。 */
    public void touchSession(Long sessionId) {
        if (sessionId == null) {
            return;
        }
        UserSessionEntity session = sessionMapper.selectById(sessionId);
        if (session == null || session.getRevokedAt() != null) {
            return;
        }
        sessionMapper.update(
                null,
                new LambdaUpdateWrapper<UserSessionEntity>()
                        .eq(UserSessionEntity::getId, sessionId)
                        .set(UserSessionEntity::getLastActiveAt, LocalDateTime.now()));
        jwtTokenProvider.slideRefreshValidity(session.getUserId(), session.getRefreshJti());
    }
}
