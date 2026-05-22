package org.example.karios.model.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/** POST /api/v1/auth/oauth/apple 请求体 */
@Data
public class AppleLoginRequest {
    /** Apple 返回的 JWT identityToken */
    @NotBlank
    private String identityToken;

    /** 可选，服务端当前未持久化 */
    private String authorizationCode;

    @NotBlank
    private String termsVersion;

    private String privacyVersion;
    private String deviceId;
    private String deviceName;
    private String platform;
    /** 仅首次授权时 Apple 可能附带姓名/邮箱 */
    private AppleUserPayload user;

    @Data
    public static class AppleUserPayload {
        private String email;
        private AppleFullName fullName;
    }

    @Data
    public static class AppleFullName {
        private String givenName;
        private String familyName;
    }
}
