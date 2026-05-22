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
 * 用户登录会话表
 */
@Data
@TableName("user_sessions")
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class UserSessionEntity {

    /** 会话主键 ID，写入 JWT Claim sid */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 关联用户 ID */
    @TableField("user_id")
    private Long userId;

    /** Refresh Token 唯一标识 jti */
    @TableField("refresh_jti")
    private String refreshJti;

    /** 登录设备 ID */
    @TableField("device_id")
    private String deviceId;

    /** 登录设备名称 */
    @TableField("device_name")
    private String deviceName;

    /** 客户端平台：ios / android */
    @TableField("platform")
    private String platform;

    /** 登录时 IP 地址 */
    @TableField("ip")
    private String ip;

    /** 会话最后活跃时间 */
    @TableField("last_active_at")
    private LocalDateTime lastActiveAt;

    /** 会话吊销时间，登出或踢下线时写入 */
    @TableField("revoked_at")
    private LocalDateTime revokedAt;

    /** 会话创建时间 */
    @TableField("created_at")
    private LocalDateTime createdAt;
}
