package org.example.karios.model.response.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/** 用户摘要，用于登录响应与列表展示 */
@Data
public class UserSummaryResponse {
    private String id;
    private String nickname;
    private String avatarUrl;
    /** incomplete / complete */
    private String profileStatus;
    @JsonProperty("isVerified")
    private boolean verified;
}
