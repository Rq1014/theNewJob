package org.example.karios.service.auth;

import org.example.karios.model.bo.auth.LoginCommand;
import org.example.karios.model.bo.auth.LoginResult;
import org.example.karios.model.response.auth.AuthTokensResponse;
import org.example.karios.model.response.auth.RefreshTokenResponse;

/**
 * 登录通行证：统一处理注册/登录、Token 刷新与登出。
 */
public interface PassportService {
    /** 按第三方凭证登录，不存在则自动注册。 */
    LoginResult loginOrRegister(LoginCommand command);

    /** 使用 Refresh Token 换取新的 Access Token。 */
    RefreshTokenResponse refreshAccessToken(String refreshToken);

    /** 拉黑当前 Access jti，并可选吊销 Refresh 会话。 */
    void logout(Long userId, String accessJti, String refreshToken);
}
