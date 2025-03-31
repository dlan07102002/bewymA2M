package vn.duclan.bewym.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import vn.duclan.bewym.dto.response.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<String>> handleJsonParserException() {
        return ResponseEntity.badRequest().body(ApiResponse.<String>builder().success(false)
                .data("Invalid request body. Please check the data format.").build());
    }

    @ExceptionHandler(value = NoResourceFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleNoResourceFoundException() {
        return ResponseEntity.badRequest().body(ApiResponse.<String>builder().success(false)
                .data("Invalid resource access").build());
    }

    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<ApiResponse<String>> handleAppException(AppException appException) {
        return ResponseEntity.badRequest().body(ApiResponse.<String>builder().success(false)
                .data(appException.getMessage()).build());
    }
}