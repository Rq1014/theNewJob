package org.example.karios.common;

import lombok.Getter;

/** 可预期的业务异常，由 {@link GlobalExceptionHandler} 转为 {@link ApiResponse}。 */
@Getter
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getDefaultMessage());
        this.errorCode = errorCode;
    }

    public BusinessException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
}
