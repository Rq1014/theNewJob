package org.example.karios.service.user.impl;

import org.example.karios.common.BusinessException;
import org.example.karios.common.ErrorCode;
import org.example.karios.entity.UserEntity;
import org.example.karios.mapper.UserMapper;
import org.example.karios.model.request.user.UpdateUserRequest;
import org.example.karios.model.response.user.UserProfileResponse;
import org.example.karios.service.user.UserConverter;
import org.example.karios.service.user.UserService;
import org.springframework.stereotype.Service;

/** 用户资料：查询与 PATCH 式更新，资料齐全时自动标记 profile_status=complete。 */
@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public UserProfileResponse getMe(Long userId) {
        UserEntity user = requireUser(userId);
        return UserConverter.toProfile(user);
    }

    @Override
    public UserProfileResponse updateMe(Long userId, UpdateUserRequest request) {
        UserEntity user = requireUser(userId);
        if (request.getNickname() != null) {
            user.setNickname(request.getNickname());
        }
        if (request.getAvatarUrl() != null) {
            user.setAvatarUrl(request.getAvatarUrl());
        }
        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }
        if (request.getUniversity() != null) {
            user.setUniversity(request.getUniversity());
        }
        if (request.getCity() != null) {
            user.setCity(request.getCity());
        }
        if (request.getUserType() != null) {
            user.setUserType(request.getUserType());
        }
        if (request.getProfileStatus() != null) {
            user.setProfileStatus(request.getProfileStatus());
        } else if (isProfileComplete(user)) {
            user.setProfileStatus("complete");
        }
        userMapper.updateById(user);
        return UserConverter.toProfile(userMapper.selectById(userId));
    }

    private UserEntity requireUser(Long userId) {
        UserEntity user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND, "用户不存在");
        }
        return user;
    }

    private boolean isProfileComplete(UserEntity user) {
        return user.getNickname() != null
                && !user.getNickname().isBlank()
                && user.getUniversity() != null
                && !user.getUniversity().isBlank()
                && user.getCity() != null
                && !user.getCity().isBlank();
    }
}
