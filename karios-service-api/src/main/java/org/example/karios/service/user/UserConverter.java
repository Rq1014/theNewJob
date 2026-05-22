package org.example.karios.service.user;

import org.example.karios.entity.UserAuthBindingEntity;
import org.example.karios.entity.UserEntity;
import org.example.karios.model.response.auth.AuthBindingResponse;
import org.example.karios.model.response.user.UserProfileResponse;
import org.example.karios.model.response.user.UserSummaryResponse;

/** Entity 与 API DTO 转换，绑定列表对 provider_user_id 做脱敏。 */
public final class UserConverter {

    private UserConverter() {}

    /** 登录响应等场景使用的用户摘要。 */
    public static UserSummaryResponse toSummary(UserEntity user) {
        UserSummaryResponse response = new UserSummaryResponse();
        response.setId(String.valueOf(user.getId()));
        response.setNickname(user.getNickname());
        response.setAvatarUrl(user.getAvatarUrl());
        response.setProfileStatus(user.getProfileStatus());
        response.setVerified(Boolean.TRUE.equals(user.getVerified()));
        return response;
    }

    /** 个人中心完整资料（统计字段暂为占位 0）。 */
    public static UserProfileResponse toProfile(UserEntity user) {
        UserProfileResponse response = new UserProfileResponse();
        UserSummaryResponse summary = toSummary(user);
        response.setId(summary.getId());
        response.setNickname(summary.getNickname());
        response.setAvatarUrl(summary.getAvatarUrl());
        response.setProfileStatus(summary.getProfileStatus());
        response.setVerified(summary.isVerified());
        response.setBio(user.getBio());
        response.setInterests(user.getInterests());
        response.setUniversity(user.getUniversity());
        response.setCity(user.getCity());
        response.setUserType(user.getUserType());
        response.setCreatedAt(user.getCreatedAt());
        response.setPostsCount(0);
        response.setLikesReceived(0);
        response.setFavoritesCount(0);
        response.setReviewsCount(0);
        return response;
    }

    public static AuthBindingResponse toBinding(UserAuthBindingEntity binding) {
        // provider_user_id 按渠道脱敏后返回
        AuthBindingResponse response = new AuthBindingResponse();
        response.setProvider(binding.getProvider());
        response.setMaskedTarget(mask(binding.getProvider(), binding.getProviderUserId()));
        response.setCreatedAt(binding.getCreatedAt());
        return response;
    }

    private static String mask(String provider, String target) {
        if (target == null) {
            return "****";
        }
        if ("apple".equals(provider)) {
            return "Apple ID";
        }
        if ("email".equals(provider) && target.contains("@")) {
            int at = target.indexOf('@');
            if (at <= 1) {
                return "****" + target.substring(at);
            }
            return target.charAt(0) + "***" + target.substring(at);
        }
        if (target.length() <= 4) {
            return "****";
        }
        return target.substring(0, 3) + "****" + target.substring(target.length() - 2);
    }
}
