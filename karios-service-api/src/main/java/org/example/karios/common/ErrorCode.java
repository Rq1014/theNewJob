package org.example.karios.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * 统一业务错误码：{@code code} 为 API 响应体字段，{@code httpStatus} 为 HTTP 状态。
 */
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    SUCCESS(0, HttpStatus.OK, "ok"),
    BAD_REQUEST(40001, HttpStatus.BAD_REQUEST, "参数错误"),
    UNAUTHORIZED(40101, HttpStatus.UNAUTHORIZED, "未登录或 token 无效"),
    FORBIDDEN(40301, HttpStatus.FORBIDDEN, "无权限"),
    NOT_FOUND(40401, HttpStatus.NOT_FOUND, "资源不存在"),
    TOO_MANY_REQUESTS(42901, HttpStatus.TOO_MANY_REQUESTS, "请求过于频繁"),
    NOT_IMPLEMENTED(50101, HttpStatus.NOT_IMPLEMENTED, "功能未实现"),
    INTERNAL_ERROR(50001, HttpStatus.INTERNAL_SERVER_ERROR, "系统错误，请稍后重试");

    /** API 响应体中的业务码 */
    private final int code;
    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
