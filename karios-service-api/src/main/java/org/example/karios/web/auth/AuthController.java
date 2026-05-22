package org.example.karios.web.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.example.karios.common.ApiResponse;
import org.example.karios.common.BusinessException;
import org.example.karios.common.ErrorCode;
import org.example.karios.gateway.CurrentUser;
import org.example.karios.gateway.RequestContext;
import org.example.karios.model.request.auth.AppleLoginRequest;
import org.example.karios.model.request.auth.LogoutRequest;
import org.example.karios.model.request.auth.OtpSendRequest;
import org.example.karios.model.request.auth.OtpVerifyRequest;
import org.example.karios.model.request.auth.RefreshTokenRequest;
import org.example.karios.model.response.auth.AuthBindingsResponse;
import org.example.karios.model.response.auth.AuthTokensResponse;
import org.example.karios.model.response.auth.OtpSendResponse;
import org.example.karios.model.response.auth.RefreshTokenResponse;
import org.example.karios.service.auth.AppleAuthService;
import org.example.karios.service.auth.AuthBindingService;
import org.example.karios.service.auth.OtpAuthService;
import org.example.karios.service.auth.PassportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 认证相关 HTTP 接口：OTP、Apple OAuth、Token 刷新/登出、绑定列表。
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final OtpAuthService otpAuthService;
    private final AppleAuthService appleAuthService;
    private final PassportService passportService;
    private final AuthBindingService authBindingService;

    public AuthController(
            OtpAuthService otpAuthService,
            AppleAuthService appleAuthService,
            PassportService passportService,
            AuthBindingService authBindingService) {
        this.otpAuthService = otpAuthService;
        this.appleAuthService = appleAuthService;
        this.passportService = passportService;
        this.authBindingService = authBindingService;
    }

    @PostMapping("/otp/send")
    public ApiResponse<OtpSendResponse> sendOtp(@Valid @RequestBody OtpSendRequest request, HttpServletRequest http) {
        return ApiResponse.ok(otpAuthService.sendOtp(request, http.getRemoteAddr()));
    }

    @PostMapping("/otp/verify")
    public ApiResponse<AuthTokensResponse> verifyOtp(
            @Valid @RequestBody OtpVerifyRequest request, HttpServletRequest http) {
        return ApiResponse.ok(otpAuthService.verifyOtp(request, http.getRemoteAddr(), http.getHeader("User-Agent"))
                .getTokens());
    }

    @PostMapping("/oauth/apple")
    public ApiResponse<AuthTokensResponse> appleLogin(
            @Valid @RequestBody AppleLoginRequest request, HttpServletRequest http) {
        return ApiResponse.ok(appleAuthService.login(request, http.getRemoteAddr(), http.getHeader("User-Agent"))
                .getTokens());
    }

    @PostMapping("/oauth/{provider}")
    public ApiResponse<Void> oauthStub(@PathVariable String provider) {
        if ("wechat".equals(provider)) {
            throw new BusinessException(ErrorCode.NOT_IMPLEMENTED, "WeChat login is not available yet");
        }
        if ("google".equals(provider)) {
            throw new BusinessException(ErrorCode.NOT_IMPLEMENTED, "Google login is not available yet");
        }
        throw new BusinessException(ErrorCode.BAD_REQUEST, "不支持的登录方式");
    }

    @PostMapping("/refresh")
    public ApiResponse<RefreshTokenResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        return ApiResponse.ok(passportService.refreshAccessToken(request.getRefreshToken()));
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(@CurrentUser Long userId, @RequestBody(required = false) LogoutRequest request) {
        String refresh = request != null ? request.getRefreshToken() : null;
        passportService.logout(userId, RequestContext.getJti(), refresh);
        return ApiResponse.ok();
    }

    @GetMapping("/bindings")
    public ApiResponse<AuthBindingsResponse> bindings(@CurrentUser Long userId) {
        return ApiResponse.ok(authBindingService.listBindings(userId));
    }
}
