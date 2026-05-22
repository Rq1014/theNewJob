package org.example.karios.web.user;

import jakarta.validation.Valid;
import org.example.karios.common.ApiResponse;
import org.example.karios.gateway.CurrentUser;
import org.example.karios.model.request.user.UpdateUserRequest;
import org.example.karios.model.response.user.UserProfileResponse;
import org.example.karios.service.user.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** 当前用户资料 API，需携带有效 Access Token。 */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ApiResponse<UserProfileResponse> getMe(@CurrentUser Long userId) {
        return ApiResponse.ok(userService.getMe(userId));
    }

    @PutMapping("/me")
    public ApiResponse<UserProfileResponse> updateMe(
            @CurrentUser Long userId, @Valid @RequestBody UpdateUserRequest request) {
        return ApiResponse.ok(userService.updateMe(userId, request));
    }
}
