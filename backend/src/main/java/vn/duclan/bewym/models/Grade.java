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
public class Grade {
    private int id; // The ID of the grade record
    private int studentId; // The ID of the student (foreign key from students table)
    private int courseId; // The ID of the course (foreign key from courses table)
    private String grade; // The grade for the student in the course
}
