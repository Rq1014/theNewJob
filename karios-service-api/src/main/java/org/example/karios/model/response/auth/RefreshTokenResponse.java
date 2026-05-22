package org.example.karios.model.response.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

/** Token 刷新接口响应（含滑动续期后的 Refresh） */
@Data
@AllArgsConstructor
public class RefreshTokenResponse {
    private String accessToken;
    private long expiresIn;
    /** 滑动续期后新的 Refresh Token，客户端需覆盖本地存储 */
    private String refreshToken;
    /** Refresh 有效天数（滑动窗口） */
    private int refreshExpiresInDays;
}
