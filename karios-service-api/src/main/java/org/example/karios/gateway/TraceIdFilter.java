package org.example.karios.gateway;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * 为每个 API 请求生成或透传链路 ID，写入响应头便于前后端联调排错。
 */
public class TraceIdFilter extends OncePerRequestFilter {

    /** 请求/响应共用的 TraceId 头名称。 */
    public static final String HEADER = "X-Request-Id";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String traceId = request.getHeader(HEADER);
        if (traceId == null || traceId.isBlank()) {
            traceId = UUID.randomUUID().toString().replace("-", "");
        }
        response.setHeader(HEADER, traceId);
        filterChain.doFilter(request, response);
    }
}
