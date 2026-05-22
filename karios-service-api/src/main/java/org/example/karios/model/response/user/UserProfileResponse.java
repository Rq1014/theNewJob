package org.example.karios.model.response.user;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.EqualsAndHashCode;

/** 个人中心完整资料 */
@Data
@EqualsAndHashCode(callSuper = true)
public class UserProfileResponse extends UserSummaryResponse {
    private String bio;
    /** 兴趣爱好，逗号分隔 */
    private String interests;
    private String university;
    private String city;
    private String userType;
    /** 账号注册时间，用于展示「xxxx年x月加入」 */
    private LocalDateTime createdAt;
    /** 以下统计字段待内容模块接入后由真实数据填充 */
    private Integer postsCount;
    private Integer likesReceived;
    private Integer favoritesCount;
    private Integer reviewsCount;
}
