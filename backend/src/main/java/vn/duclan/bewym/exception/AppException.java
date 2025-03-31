package vn.duclan.bewym.exception;

import lombok.Builder;
import lombok.Getter;

@Builder
public class AppException extends RuntimeException {
    private int statusCode; // Custom status code
    private String message; // Custom error message

    public AppException(int statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
