package org.example.karios.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 统一 API 响应包装：{@code code=0} 表示成功，非 0 为业务错误码。
 *
 * @param <T> 业务数据载荷
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    /** 业务状态码，0 成功 */
    private int code;
    /** 提示文案 */
    private String message;
    /** 业务数据，失败时通常为 null */
    private T data;

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(ErrorCode.SUCCESS.getCode(), ErrorCode.SUCCESS.getDefaultMessage(), data);
    }

    public static <T> ApiResponse<T> ok() {
        return ok(null);
    }

    public static <T> ApiResponse<T> fail(ErrorCode errorCode, String message) {
        return new ApiResponse<>(errorCode.getCode(), message != null ? message : errorCode.getDefaultMessage(), null);
    }
}
