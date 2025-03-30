package vn.duclan.bewym.service;

import org.springframework.stereotype.Service;

import vn.duclan.bewym.dto.request.StudentCreateRequest;
import vn.duclan.bewym.mapper.StudentMapper;
import vn.duclan.bewym.models.Student;

import java.util.List;

@Service
public interface StudentService {

    public List<Student> getAllStudents();

    public Student getStudentById(int id);

    public Student createStudent(StudentCreateRequest student);

    public void updateStudent(Student student);

    public void deleteStudent(int id);
}
