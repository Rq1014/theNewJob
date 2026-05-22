package org.example.karios.model.response.auth;

import java.time.LocalDateTime;
import lombok.Data;

/** 单条登录绑定（凭证已脱敏） */
@Data
public class AuthBindingResponse {
    private String provider;
    /** 脱敏后的手机号/邮箱或固定文案如 Apple ID */
    private String maskedTarget;
    private LocalDateTime createdAt;
}
