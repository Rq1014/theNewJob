package org.example.karios.service.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.example.karios.common.BusinessException;
import org.example.karios.common.ErrorCode;
import org.example.karios.config.KairosProperties;
import org.example.karios.model.bo.auth.LoginCommand;
import org.example.karios.model.bo.auth.LoginResult;
import org.example.karios.model.request.auth.AppleLoginRequest;
import org.springframework.stereotype.Service;

/** Sign in with Apple：解析 identityToken 得到 sub，再委托 Passport 登录/注册。 */
@Service
public class AppleAuthService {

    private final KairosProperties properties;
    private final LegalService legalService;
    private final PassportService passportService;

    public AppleAuthService(
            KairosProperties properties, LegalService legalService, PassportService passportService) {
        this.properties = properties;
        this.legalService = legalService;
        this.passportService = passportService;
    }

    public LoginResult login(AppleLoginRequest request, String clientIp, String userAgent) {
        legalService.validateTermsVersion(request.getTermsVersion(), request.getPrivacyVersion());

        String appleSub = resolveAppleSubject(request.getIdentityToken());
        String nickname = buildNickname(request);

        LoginCommand command = LoginCommand.builder()
                .provider("apple")
                .providerUserId(appleSub)
                .primaryCredential("apple")
                .termsVersion(request.getTermsVersion())
                .privacyVersion(request.getPrivacyVersion())
                .deviceId(request.getDeviceId())
                .deviceName(request.getDeviceName())
                .platform(request.getPlatform())
                .clientIp(clientIp)
                .userAgent(userAgent)
                .suggestedNickname(nickname)
                .build();

        return passportService.loginOrRegister(command);
    }

    private String resolveAppleSubject(String identityToken) {
        if (properties.getAuth().getApple().isDevMode() && "mock-token".equals(identityToken)) {
            return "apple-mock-sub";
        }
        try {
            Claims claims = Jwts.parser().unsecured().build().parseUnsecuredClaims(identityToken).getPayload();
            String sub = claims.getSubject();
            if (sub == null || sub.isBlank()) {
                throw new BusinessException(ErrorCode.BAD_REQUEST, "Apple identityToken 缺少 sub");
            }
            if (!properties.getAuth().getApple().isDevMode()) {
                String aud = claims.getAudience() != null && !claims.getAudience().isEmpty()
                        ? claims.getAudience().iterator().next()
                        : null;
                if (aud != null && !aud.equals(properties.getAuth().getApple().getBundleId())) {
                    throw new BusinessException(ErrorCode.BAD_REQUEST, "Apple aud 不匹配");
                }
            }
            return sub;
        } catch (BusinessException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new BusinessException(ErrorCode.BAD_REQUEST, "Apple identityToken 解析失败");
        }
    }

    private String buildNickname(AppleLoginRequest request) {
        if (request.getUser() == null || request.getUser().getFullName() == null) {
            return null;
        }
        String given = request.getUser().getFullName().getGivenName();
        String family = request.getUser().getFullName().getFamilyName();
        if (given == null && family == null) {
            return null;
        }
        if (given == null) {
            return family;
        }
        if (family == null) {
            return given;
        }
        return family + given;
    }
}
