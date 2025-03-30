package vn.duclan.bewym.models;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Student {
    private Long id;
    private Date createdAt;
    private String fullName;
    private int dob;
    private String address;
}
