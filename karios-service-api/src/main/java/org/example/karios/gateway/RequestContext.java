package org.example.karios.gateway;

/**
 * 当前请求的登录上下文（ThreadLocal），由 {@link AuthGatewayFilter} 写入。
 */
public final class RequestContext {
    private static final ThreadLocal<Long> USER_ID = new ThreadLocal<>();
    private static final ThreadLocal<Long> SESSION_ID = new ThreadLocal<>();
    private static final ThreadLocal<String> JTI = new ThreadLocal<>();

    private RequestContext() {}

    public static void set(Long userId, Long sessionId, String jti) {
        USER_ID.set(userId);
        SESSION_ID.set(sessionId);
        JTI.set(jti);
    }

    public static Long getUserId() {
        return USER_ID.get();
    }

    public static Long getSessionId() {
        return SESSION_ID.get();
    }

    public static String getJti() {
        return JTI.get();
    }

    public static void clear() {
        USER_ID.remove();
        SESSION_ID.remove();
        JTI.remove();
    }
}
