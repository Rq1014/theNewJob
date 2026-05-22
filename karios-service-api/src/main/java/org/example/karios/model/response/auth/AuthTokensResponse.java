package org.example.karios.model.response.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.karios.model.response.user.UserSummaryResponse;

/** 登录/注册成功返回的 Token 与用户摘要 */
@Data
public class AuthTokensResponse {
    private String accessToken;
    private String refreshToken;
    /** Access Token 有效期（秒） */
    private long expiresIn;
    @JsonProperty("isNewUser")
    private boolean newUser;
    private UserSummaryResponse user;
}
