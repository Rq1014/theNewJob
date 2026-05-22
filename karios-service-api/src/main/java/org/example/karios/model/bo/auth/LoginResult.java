package org.example.karios.model.bo.auth;

import lombok.Builder;
import lombok.Data;
import org.example.karios.entity.UserEntity;
import org.example.karios.model.response.auth.AuthTokensResponse;

/**
 * Passport 内部登录结果：含对外 Token DTO 与持久化用户实体。
 */
@Data
@Builder
public class LoginResult {
    /** 返回给前端的 Token 与用户摘要 */
    private AuthTokensResponse tokens;
    /** 数据库用户实体，供后续业务使用 */
    private UserEntity user;
    /** 本次是否为首次注册 */
    private boolean newUser;
}
