package org.example.karios.service.auth;

import java.security.SecureRandom;
import java.time.Duration;
import org.example.karios.common.BusinessException;
import org.example.karios.common.ErrorCode;
import org.example.karios.common.PhoneNormalizer;
import org.example.karios.config.KairosProperties;
import org.example.karios.model.bo.auth.LoginCommand;
import org.example.karios.model.bo.auth.LoginResult;
import org.example.karios.model.request.auth.OtpSendRequest;
import org.example.karios.model.request.auth.OtpVerifyRequest;
import org.example.karios.model.response.auth.OtpSendResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

/**
 * 手机/邮箱 OTP 登录：验证码存 Redis，校验通过后委托 {@link PassportService}。
 */
@Service
public class OtpAuthService {

    private static final Logger log = LoggerFactory.getLogger(OtpAuthService.class);
    private static final SecureRandom RANDOM = new SecureRandom();

    private final StringRedisTemplate redisTemplate;
    private final KairosProperties properties;
    private final RiskControlService riskControlService;
    private final LegalService legalService;
    private final PassportService passportService;

    public OtpAuthService(
            StringRedisTemplate redisTemplate,
            KairosProperties properties,
            RiskControlService riskControlService,
            LegalService legalService,
            PassportService passportService) {
        this.redisTemplate = redisTemplate;
        this.properties = properties;
        this.riskControlService = riskControlService;
        this.legalService = legalService;
        this.passportService = passportService;
    }

    /** 发送验证码：风控校验 → 写 Redis → 开发环境日志打印验证码。 */
    public OtpSendResponse sendOtp(OtpSendRequest request, String clientIp) {
        validateChannel(request.getChannel());
        legalService.validateTermsVersion(request.getTermsVersion(), request.getPrivacyVersion());

        String providerUserId = PhoneNormalizer.providerUserId(request.getChannel(), request.getTarget());
        riskControlService.checkSendOtp(request.getChannel(), providerUserId, clientIp, request.getDeviceId());

        String code = generateCode();
        String otpKey = otpKey(request.getChannel(), providerUserId);
        int ttl = properties.getAuth().getOtp().getTtlSeconds();
        int cooldown = properties.getAuth().getOtp().getCooldownSeconds();

        redisTemplate.opsForValue().set(otpKey, code, Duration.ofSeconds(ttl));
        redisTemplate.opsForValue().set(rateKey(request.getChannel(), providerUserId), "1", Duration.ofSeconds(cooldown));

        log.info("[OTP] channel={} target={} code={} (dev only log)", request.getChannel(), maskTarget(providerUserId), code);

        return new OtpSendResponse(ttl, cooldown);
    }

    /** 校验 OTP 并走统一登录/注册流程。 */
    public LoginResult verifyOtp(OtpVerifyRequest request, String clientIp, String userAgent) {
        validateChannel(request.getChannel());
        legalService.validateTermsVersion(request.getTermsVersion(), request.getPrivacyVersion());

        String providerUserId = PhoneNormalizer.providerUserId(request.getChannel(), request.getTarget());
        String otpKey = otpKey(request.getChannel(), providerUserId);
        String stored = redisTemplate.opsForValue().get(otpKey);

        if (stored == null) {
            throw new BusinessException(ErrorCode.BAD_REQUEST, "验证码错误或已过期");
        }

        String devCode = properties.getAuth().getOtp().getDevCode();
        boolean devMatch = devCode != null && devCode.equals(request.getCode());
        if (!devMatch && !stored.equals(request.getCode())) {
            throw new BusinessException(ErrorCode.BAD_REQUEST, "验证码错误或已过期");
        }

        redisTemplate.delete(otpKey);

        LoginCommand command = LoginCommand.builder()
                .provider(request.getChannel())
                .providerUserId(providerUserId)
                .primaryCredential(request.getChannel())
                .termsVersion(request.getTermsVersion())
                .privacyVersion(request.getPrivacyVersion())
                .deviceId(request.getDeviceId())
                .deviceName(request.getDeviceName())
                .platform(request.getPlatform())
                .clientIp(clientIp)
                .userAgent(userAgent)
                .build();

        return passportService.loginOrRegister(command);
    }

    private String generateCode() {
        String devCode = properties.getAuth().getOtp().getDevCode();
        if (devCode != null && !devCode.isBlank()) {
            return devCode;
        }
        return String.format("%06d", RANDOM.nextInt(1_000_000));
    }

    private void validateChannel(String channel) {
        if (!"email".equals(channel) && !"phone".equals(channel)) {
            throw new BusinessException(ErrorCode.BAD_REQUEST, "channel 仅支持 email 或 phone");
        }
    }

    private String otpKey(String channel, String target) {
        return "otp:" + channel + ":" + target;
    }

    private String rateKey(String channel, String target) {
        return "otp:rate:" + channel + ":" + target;
    }

    private String maskTarget(String target) {
        if (target == null || target.length() < 4) {
            return "****";
        }
        return target.substring(0, 2) + "****" + target.substring(target.length() - 2);
    }
}
