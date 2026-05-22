package org.example.karios.model.response.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

/** OTP 发送成功后的提示信息 */
@Data
@AllArgsConstructor
public class OtpSendResponse {
    /** 验证码有效时长（秒） */
    private int expiresIn;
    /** 同目标再次发送前需等待的冷却时间（秒） */
    private int cooldown;
}
