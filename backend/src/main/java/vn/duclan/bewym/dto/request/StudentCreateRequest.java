package vn.duclan.bewym.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudentCreateRequest {
    private String fullName;
    private int dob;
    private String address;
}
