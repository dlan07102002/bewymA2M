package vn.duclan.bewym.dto.response;

import java.util.Set;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import vn.duclan.bewym.models.Student;

@Builder
@Getter
@Setter
public class StudentsResponse {
    private int count;
    private Set<Student> lst;
}
