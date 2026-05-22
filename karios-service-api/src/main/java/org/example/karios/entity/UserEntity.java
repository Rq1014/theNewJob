package org.example.karios.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 用户主表
 */
@Data
@TableName("users")
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class UserEntity {

    /** 用户主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 昵称，资料未完善时可为空 */
    @TableField("nickname")
    private String nickname;

    /** 头像 URL */
    @TableField("avatar_url")
    private String avatarUrl;

    /** 个人简介 */
    @TableField("bio")
    private String bio;

    /** 兴趣爱好，逗号分隔 */
    @TableField("interests")
    private String interests;

    /** 学校名称 */
    @TableField("university")
    private String university;

    /** 常驻城市编码，如 tokyo、osaka */
    @TableField("city")
    private String city;

    /** 用户身份类型，如 graduate_student */
    @TableField("user_type")
    private String userType;

    /** 资料状态：incomplete 未完善 / complete 已完善 */
    @TableField("profile_status")
    private String profileStatus;

    /** 首次注册主凭证类型：phone / email / apple */
    @TableField("primary_credential")
    private String primaryCredential;

    /** 账号状态：active 正常 / suspended 封禁 / deleted 注销 */
    @TableField("status")
    private String status;

    /** 是否平台认证用户：0 否 / 1 是 */
    @TableField("is_verified")
    private Boolean verified;

    /** 最近一次登录时间 */
    @TableField("last_login_at")
    private LocalDateTime lastLoginAt;

    /** 创建时间 */
    @TableField("created_at")
    private LocalDateTime createdAt;

    /** 更新时间 */
    @TableField("updated_at")
    private LocalDateTime updatedAt;
}
