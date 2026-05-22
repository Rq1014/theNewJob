package org.example.karios.model.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/** POST /api/v1/auth/otp/verify 请求体，校验通过后登录或注册 */
@Data
public class OtpVerifyRequest {
    @NotBlank
    private String channel;

    @NotBlank
    private String target;

    @NotBlank
    private String code;

    @NotBlank
    private String termsVersion;

    private String privacyVersion;
    private String deviceId;
    private String deviceName;
    private String platform;
}
