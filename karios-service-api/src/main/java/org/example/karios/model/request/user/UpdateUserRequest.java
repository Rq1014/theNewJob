package org.example.karios.model.request.user;

import lombok.Data;

/** PUT /api/v1/users/me 请求体，字段均为可选（部分更新） */
@Data
public class UpdateUserRequest {
    private String nickname;
    private String avatarUrl;
    private String bio;
    private String university;
    private String city;
    private String userType;
    /** 不传且必填项齐全时服务端可自动设为 complete */
    private String profileStatus;
}
