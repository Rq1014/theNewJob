package org.example.karios.model.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/** POST /api/v1/auth/otp/send 请求体 */
@Data
public class OtpSendRequest {
    /** 通道：phone 或 email */
    @NotBlank
    private String channel;

    /** 手机号或邮箱原文，服务端会规范化 */
    @NotBlank
    private String target;

    /** 客户端已同意的用户协议版本 */
    @NotBlank
    private String termsVersion;

    /** 隐私政策版本，可空 */
    private String privacyVersion;

    private String deviceId;
}
