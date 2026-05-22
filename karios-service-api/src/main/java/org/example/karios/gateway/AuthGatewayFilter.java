package org.example.karios.gateway;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.example.karios.common.ApiResponse;
import org.example.karios.common.ErrorCode;
import org.example.karios.config.KairosProperties;
import org.example.karios.service.auth.SessionSlideService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * API 网关鉴权过滤器：白名单放行，其余请求校验 Access JWT。
 * <p>校验通过后把 userId、sessionId、access jti 写入 {@link RequestContext}。
 */
@Component
public class AuthGatewayFilter extends OncePerRequestFilter {

    private final KairosProperties properties;
    private final JwtTokenProvider jwtTokenProvider;
    private final SessionSlideService sessionSlideService;

    public AuthGatewayFilter(
            KairosProperties properties,
            JwtTokenProvider jwtTokenProvider,
            SessionSlideService sessionSlideService) {
        this.properties = properties;
        this.jwtTokenProvider = jwtTokenProvider;
        this.sessionSlideService = sessionSlideService;
    }

    /** 按配置白名单或 Bearer Token 决定是否放行，并在 finally 中清理线程上下文。 */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            if (isWhitelisted(request)) {
                filterChain.doFilter(request, response);
                return;
            }

            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                writeUnauthorized(response);
                return;
            }

            String token = authHeader.substring(7);
            Claims claims;
            try {
                claims = jwtTokenProvider.parse(token);
            } catch (Exception ex) {
                writeUnauthorized(response);
                return;
            }

            if (!JwtTokenProvider.TYPE_ACCESS.equals(claims.get(JwtTokenProvider.CLAIM_TYP, String.class))) {
                writeUnauthorized(response);
                return;
            }

            String jti = claims.getId();
            if (jwtTokenProvider.isBlacklisted(jti)) {
                writeUnauthorized(response);
                return;
            }

            Long userId = Long.parseLong(claims.getSubject());
            Long sessionId = claims.get(JwtTokenProvider.CLAIM_SID, Long.class);
            RequestContext.set(userId, sessionId, jti);
            sessionSlideService.touchOnActivity(sessionId);
            filterChain.doFilter(request, response);
        } finally {
            RequestContext.clear();
        }
    }

    /** 白名单键格式：{@code METHOD:URI}，与 application.yml 中 gateway.whitelist 一致。 */
    private boolean isWhitelisted(HttpServletRequest request) {
        String key = request.getMethod() + ":" + request.getRequestURI();
        List<String> whitelist = properties.getGateway().getWhitelist();
        return whitelist != null && whitelist.contains(key);
    }

    private void writeUnauthorized(HttpServletResponse response) throws IOException {
        response.setStatus(ErrorCode.UNAUTHORIZED.getHttpStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        String body =
                "{\"code\":40101,\"message\":\"未登录或 token 无效\",\"data\":null}";
        response.getWriter().write(body);
    }
}
