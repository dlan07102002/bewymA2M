package vn.duclan.bewym.service;

import org.springframework.stereotype.Service;

import vn.duclan.bewym.dto.request.StudentSaveRequest;
import vn.duclan.bewym.dto.response.StudentsResponse;
import vn.duclan.bewym.models.Student;

@Service
public interface StudentService {

    public StudentsResponse getStudents(String keySearch, int limit, int offset);

    public Student getStudentById(Long id);

    public Student saveStudent(StudentSaveRequest student);

    public void updateStudent(Student student);

    public void deleteStudent(int id);
}
