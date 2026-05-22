package org.example.karios.service.auth;

import java.time.Duration;
import org.example.karios.common.BusinessException;
import org.example.karios.common.ErrorCode;
import org.example.karios.config.KairosProperties;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

/** OTP 发送频控：单目标冷却、日上限、IP/设备分钟级限流（Redis 计数）。 */
@Service
public class RiskControlService {

    private final StringRedisTemplate redisTemplate;
    private final KairosProperties properties;

    public RiskControlService(StringRedisTemplate redisTemplate, KairosProperties properties) {
        this.redisTemplate = redisTemplate;
        this.properties = properties;
    }

    public void checkSendOtp(String channel, String target, String ip, String deviceId) {
        String rateKey = "otp:rate:" + channel + ":" + target;
        if (Boolean.TRUE.equals(redisTemplate.hasKey(rateKey))) {
            throw new BusinessException(ErrorCode.TOO_MANY_REQUESTS, "发送过于频繁，请稍后再试");
        }

        String dailyKey = "otp:daily:" + channel + ":" + target;
        Long dailyCount = redisTemplate.opsForValue().increment(dailyKey);
        if (dailyCount != null && dailyCount == 1) {
            redisTemplate.expire(dailyKey, Duration.ofDays(1));
        }
        if (dailyCount != null && dailyCount > properties.getAuth().getOtp().getDailyLimit()) {
            throw new BusinessException(ErrorCode.TOO_MANY_REQUESTS, "今日发送次数已达上限");
        }

        if (ip != null && !ip.isBlank()) {
            checkCounter("rate:ip:" + ip, properties.getAuth().getRisk().getIpPerMinute(), Duration.ofMinutes(1));
        }
        if (deviceId != null && !deviceId.isBlank()) {
            checkCounter(
                    "rate:device:" + deviceId,
                    properties.getAuth().getRisk().getDevicePerMinute(),
                    Duration.ofMinutes(1));
        }
    }

    private void checkCounter(String key, int limit, Duration ttl) {
        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1) {
            redisTemplate.expire(key, ttl);
        }
        if (count != null && count > limit) {
            throw new BusinessException(ErrorCode.TOO_MANY_REQUESTS);
        }
    }
}
