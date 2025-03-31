package vn.duclan.bewym.models;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class Course {
    int id; // The ID of the course
    String courseName; // The name of the course
    String courseDescription; // A description of the course
}
