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
 * 用户登录凭证绑定表
 */
@Data
@TableName("user_auth_bindings")
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class UserAuthBindingEntity {

    /** 绑定记录主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 关联用户 ID */
    @TableField("user_id")
    private Long userId;

    /** 登录提供方：email / phone / apple / wechat / google */
    @TableField("provider")
    private String provider;

    /** 提供方侧唯一标识：邮箱、E.164 手机号、Apple sub、微信 openid 等 */
    @TableField("provider_user_id")
    private String providerUserId;

    /** 凭证扩展元数据 JSON */
    @TableField("credential_meta")
    private String credentialMeta;

    /** 绑定创建时间 */
    @TableField("created_at")
    private LocalDateTime createdAt;

    /** 绑定更新时间 */
    @TableField("updated_at")
    private LocalDateTime updatedAt;
}
