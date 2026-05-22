package org.example.karios.model.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/** POST /api/v1/auth/refresh 请求体 */
@Data
public class RefreshTokenRequest {
    @NotBlank
    private String refreshToken;
}
