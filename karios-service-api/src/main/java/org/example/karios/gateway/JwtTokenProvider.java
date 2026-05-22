package org.example.karios.gateway;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.example.karios.config.KairosProperties;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

/**
 * JWT 签发与校验，配合 Redis 管理 Access 黑名单与 Refresh 有效性。
 */
@Component
public class JwtTokenProvider {

    /** Claim：token 类型（access / refresh）。 */
    public static final String CLAIM_TYP = "typ";
    /** Claim：关联的 {@code user_sessions.id}。 */
    public static final String CLAIM_SID = "sid";
    public static final String TYPE_ACCESS = "access";
    public static final String TYPE_REFRESH = "refresh";

    private final SecretKey secretKey;
    private final KairosProperties properties;
    private final StringRedisTemplate redisTemplate;

    public JwtTokenProvider(KairosProperties properties, StringRedisTemplate redisTemplate) {
        this.properties = properties;
        this.redisTemplate = redisTemplate;
        this.secretKey = Keys.hmacShaKeyFor(properties.getAuth().getJwt().getSecret().getBytes(StandardCharsets.UTF_8));
    }

    /** 登录成功后签发一对 Access / Refresh Token。 */
    public TokenPair issueTokenPair(Long userId, Long sessionId) {
        return issueTokenPair(userId, sessionId, null);
    }

    /**
     * 签发 Token 对；若传入 presetRefreshJti，则与已落库的会话 refresh_jti 保持一致。
     */
    public TokenPair issueTokenPair(Long userId, Long sessionId, String presetRefreshJti) {
        String accessJti = UUID.randomUUID().toString().replace("-", "");
        String refreshJti = presetRefreshJti != null ? presetRefreshJti : UUID.randomUUID().toString().replace("-", "");
        Instant now = Instant.now();

        String accessToken = Jwts.builder()
                .id(accessJti)
                .subject(String.valueOf(userId))
                .claim(CLAIM_TYP, TYPE_ACCESS)
                .claim(CLAIM_SID, sessionId)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(properties.getAuth().getJwt().getAccessTtlSeconds())))
                .signWith(secretKey)
                .compact();

        String refreshToken = Jwts.builder()
                .id(refreshJti)
                .subject(String.valueOf(userId))
                .claim(CLAIM_TYP, TYPE_REFRESH)
                .claim(CLAIM_SID, sessionId)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(properties.getAuth().getJwt().getRefreshTtlDays() * 86400L)))
                .signWith(secretKey)
                .compact();

        String refreshKey = refreshRedisKey(userId, refreshJti);
        redisTemplate.opsForValue().set(refreshKey, "1", java.time.Duration.ofDays(properties.getAuth().getJwt().getRefreshTtlDays()));

        return new TokenPair(
                accessToken, accessJti, refreshToken, refreshJti, properties.getAuth().getJwt().getAccessTtlSeconds());
    }

    /** Refresh 续期时仅签发新的 Access Token（不轮换 Refresh）。 */
    public String issueAccessOnly(Long userId, Long sessionId) {
        String accessJti = UUID.randomUUID().toString().replace("-", "");
        Instant now = Instant.now();
        return Jwts.builder()
                .id(accessJti)
                .subject(String.valueOf(userId))
                .claim(CLAIM_TYP, TYPE_ACCESS)
                .claim(CLAIM_SID, sessionId)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(properties.getAuth().getJwt().getAccessTtlSeconds())))
                .signWith(secretKey)
                .compact();
    }

    public long getAccessTtlSeconds() {
        return properties.getAuth().getJwt().getAccessTtlSeconds();
    }

    /** 校验签名并解析 JWT Claims。 */
    public Claims parse(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
    }

    /** 登出后的 Access Token jti 是否在黑名单中。 */
    public boolean isBlacklisted(String jti) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(blacklistKey(jti)));
    }

    public void blacklist(String jti, long ttlSeconds) {
        if (ttlSeconds > 0) {
            redisTemplate.opsForValue().set(blacklistKey(jti), "1", java.time.Duration.ofSeconds(ttlSeconds));
        }
    }

    public void revokeRefresh(Long userId, String refreshJti) {
        redisTemplate.delete(refreshRedisKey(userId, refreshJti));
    }

    public boolean refreshExists(Long userId, String refreshJti) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(refreshRedisKey(userId, refreshJti)));
    }

    public String refreshRedisKey(Long userId, String refreshJti) {
        return "refresh:" + userId + ":" + refreshJti;
    }

    private String blacklistKey(String jti) {
        return "jwt:blacklist:" + jti;
    }

    /** accessToken / refreshToken 及对应 jti、Access 过期秒数。 */
    public record TokenPair(
            String accessToken, String accessJti, String refreshToken, String refreshJti, long expiresIn) {}
}
