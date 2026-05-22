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
 * 用户协议与隐私政策同意记录表
 */
@Data
@TableName("user_terms_consents")
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class UserTermsConsentEntity {

    /** 同意记录主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 关联用户 ID */
    @TableField("user_id")
    private Long userId;

    /** 已同意的用户协议版本号 */
    @TableField("terms_version")
    private String termsVersion;

    /** 已同意的隐私政策版本号 */
    @TableField("privacy_version")
    private String privacyVersion;

    /** 用户同意协议时间 */
    @TableField("agreed_at")
    private LocalDateTime agreedAt;

    /** 同意时客户端 IP */
    @TableField("client_ip")
    private String clientIp;

    /** 同意时客户端 User-Agent */
    @TableField("user_agent")
    private String userAgent;

    /** 同意时客户端设备 ID */
    @TableField("device_id")
    private String deviceId;
}
