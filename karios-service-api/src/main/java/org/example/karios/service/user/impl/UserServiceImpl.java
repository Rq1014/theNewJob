package org.example.karios.service.user.impl;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
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
        LambdaUpdateWrapper<UserEntity> update = new LambdaUpdateWrapper<>();
        update.eq(UserEntity::getId, userId);
        boolean changed = false;

        if (request.getNickname() != null) {
            update.set(UserEntity::getNickname, request.getNickname());
            user.setNickname(request.getNickname());
            changed = true;
        }
        if (request.getAvatarUrl() != null) {
            update.set(UserEntity::getAvatarUrl, request.getAvatarUrl());
            user.setAvatarUrl(request.getAvatarUrl());
            changed = true;
        }
        if (request.getBio() != null) {
            update.set(UserEntity::getBio, request.getBio());
            user.setBio(request.getBio());
            changed = true;
        }
        if (request.getInterests() != null) {
            update.set(UserEntity::getInterests, request.getInterests());
            user.setInterests(request.getInterests());
            changed = true;
        }
        if (request.getUniversity() != null) {
            update.set(UserEntity::getUniversity, request.getUniversity());
            user.setUniversity(request.getUniversity());
            changed = true;
        }
        if (request.getCity() != null) {
            update.set(UserEntity::getCity, request.getCity());
            user.setCity(request.getCity());
            changed = true;
        }
        if (request.getUserType() != null) {
            update.set(UserEntity::getUserType, request.getUserType());
            user.setUserType(request.getUserType());
            changed = true;
        }
        if (request.getProfileStatus() != null) {
            update.set(UserEntity::getProfileStatus, request.getProfileStatus());
            user.setProfileStatus(request.getProfileStatus());
            changed = true;
        } else if (isProfileComplete(user)) {
            update.set(UserEntity::getProfileStatus, "complete");
            user.setProfileStatus("complete");
            changed = true;
        }

        if (changed) {
            userMapper.update(null, update);
        }
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
