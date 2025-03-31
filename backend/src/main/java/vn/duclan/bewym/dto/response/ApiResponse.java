package vn.duclan.bewym.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter

public class ApiResponse<T> {
    private boolean success;
    private T data;
}
