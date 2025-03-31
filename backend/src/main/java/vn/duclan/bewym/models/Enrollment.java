package vn.duclan.bewym.models;

import java.util.Date;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class Enrollment {
    private int id; // The ID of the enrollment record
    private int studentId; // The ID of the student (foreign key from students table)
    private int courseId; // The ID of the course (foreign key from courses table)
    private Date enrollmentDate; // The date the student enrolled in the course

}
