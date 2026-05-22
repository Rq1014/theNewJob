package org.example.karios.model.bo.auth;

import lombok.Builder;
import lombok.Data;

/**
 * 统一登录/注册入参，由 OTP、Apple 等 CredentialProvider 组装后交给 Passport。
 */
@Data
@Builder
public class LoginCommand {
    /** 凭证类型：phone / email / apple */
    private String provider;
    /** 凭证侧唯一 ID（规范化后的手机号或邮箱、Apple sub） */
    private String providerUserId;
    /** 写入 users.primary_credential 的首登凭证类型 */
    private String primaryCredential;
    /** 用户同意的服务协议版本 */
    private String termsVersion;
    /** 用户同意的隐私政策版本，可空则与 termsVersion 相同 */
    private String privacyVersion;
    private String deviceId;
    private String deviceName;
    /** 客户端平台：ios / android */
    private String platform;
    private String clientIp;
    private String userAgent;
    /** 新用户默认昵称（如 Apple 首次授权姓名） */
    private String suggestedNickname;
}
