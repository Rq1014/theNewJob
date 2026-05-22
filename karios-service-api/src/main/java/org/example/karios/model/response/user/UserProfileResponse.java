package org.example.karios.model.response.user;

import lombok.Data;
import lombok.EqualsAndHashCode;

/** 个人中心完整资料 */
@Data
@EqualsAndHashCode(callSuper = true)
public class UserProfileResponse extends UserSummaryResponse {
    private String bio;
    private String university;
    private String city;
    private String userType;
    /** 以下统计字段待内容模块接入后由真实数据填充 */
    private Integer postsCount;
    private Integer likesReceived;
    private Integer favoritesCount;
    private Integer reviewsCount;
}
