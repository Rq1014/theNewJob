package org.example.karios.service.user;

import org.example.karios.model.request.user.UpdateUserRequest;
import org.example.karios.model.response.user.UserProfileResponse;

/** 当前登录用户资料读写。 */
public interface UserService {
    UserProfileResponse getMe(Long userId);

    UserProfileResponse updateMe(Long userId, UpdateUserRequest request);
}
