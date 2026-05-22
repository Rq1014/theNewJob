package org.example.karios.model.response.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

/** Token 刷新接口响应 */
@Data
@AllArgsConstructor
public class RefreshTokenResponse {
    private String accessToken;
    private long expiresIn;
}
