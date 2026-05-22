package org.example.karios.model.request.auth;

import lombok.Data;

/** POST /api/v1/auth/logout 可选请求体 */
@Data
public class LogoutRequest {
    /** 若传入则同时吊销对应 Refresh 会话 */
    private String refreshToken;
}
