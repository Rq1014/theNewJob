package org.example.karios.common;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.mybatis.spring.MyBatisSystemException;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.transaction.CannotCreateTransactionException;
import org.springframework.transaction.TransactionException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 统一异常映射：业务/参数错误返回可读文案；系统内部错误仅返回「服务器错误」，详情只写日志。
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusiness(BusinessException ex) {
        return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                .body(ApiResponse.fail(ex.getErrorCode(), ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException ex) {
        FieldError fieldError = ex.getBindingResult().getFieldError();
        String message =
                fieldError != null ? fieldError.getDefaultMessage() : ErrorCode.BAD_REQUEST.getDefaultMessage();
        return ResponseEntity.status(ErrorCode.BAD_REQUEST.getHttpStatus())
                .body(ApiResponse.fail(ErrorCode.BAD_REQUEST, message));
    }

    @ExceptionHandler({
        MissingServletRequestParameterException.class,
        HttpMessageNotReadableException.class,
        IllegalArgumentException.class
    })
    public ResponseEntity<ApiResponse<Void>> handleBadRequest(Exception ex) {
        return ResponseEntity.status(ErrorCode.BAD_REQUEST.getHttpStatus())
                .body(ApiResponse.fail(ErrorCode.BAD_REQUEST, ErrorCode.BAD_REQUEST.getDefaultMessage()));
    }

    /** 数据库连接、事务、SQL 等基础设施异常，不向客户端暴露底层原因。 */
    @ExceptionHandler({
        CannotCreateTransactionException.class,
        TransactionException.class,
        DataAccessException.class,
        MyBatisSystemException.class
    })
    public ResponseEntity<ApiResponse<Void>> handleInfrastructure(
            Exception ex, HttpServletRequest request) {
        log.error(
                "Infrastructure error {} {}",
                request.getMethod(),
                request.getRequestURI(),
                ex);
        return internalErrorResponse();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleOther(Exception ex, HttpServletRequest request) {
        if (ex instanceof BusinessException business) {
            return handleBusiness(business);
        }
        log.error("Unhandled error {} {}", request.getMethod(), request.getRequestURI(), ex);
        return internalErrorResponse();
    }

    private static ResponseEntity<ApiResponse<Void>> internalErrorResponse() {
        return ResponseEntity.status(ErrorCode.INTERNAL_ERROR.getHttpStatus())
                .body(ApiResponse.fail(ErrorCode.INTERNAL_ERROR, ErrorCode.INTERNAL_ERROR.getDefaultMessage()));
    }
}
