package vn.duclan.bewym.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentSaveRequest {
    Long id = 0L;
    String fullName;
    int dob;
    String address;
}
