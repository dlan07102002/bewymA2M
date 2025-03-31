package vn.duclan.bewym.service.impl;

import org.springframework.stereotype.Service;

import vn.duclan.bewym.dto.request.StudentSaveRequest;
import vn.duclan.bewym.dto.response.StudentsResponse;
import vn.duclan.bewym.exception.AppException;
import vn.duclan.bewym.mapper.StudentMapper;
import vn.duclan.bewym.models.Student;
import vn.duclan.bewym.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentMapper studentMapper;

    public StudentServiceImpl(StudentMapper studentMapper) {
        this.studentMapper = studentMapper;
    }

    public StudentsResponse getStudents(String keySearch, int limit, int offset) {
        return StudentsResponse.builder().lst(studentMapper.findStudents(keySearch, limit, offset))
                .count(studentMapper.count(keySearch)).build();
    }

    public Student getStudentById(Long id) {
        return studentMapper.findById(id);
    }

    public Student saveStudent(StudentSaveRequest request) {
        Student student = new Student();
        student.setFullName(request.getFullName());
        student.setAddress(request.getAddress());
        student.setDob(request.getDob());

        if (request.getId() != 0 && studentMapper.findById(request.getId()) == null) {
            throw AppException.builder().statusCode(400).message("Student is not exist").build();
        }

        if (studentMapper.findById(request.getId()) != null) {
            student.setId(request.getId());
            studentMapper.update(student);
        } else {
            studentMapper.insert(student);

        }

        return student;
    }

    public void updateStudent(Student student) {
        studentMapper.update(student);
    }

    public void deleteStudent(int id) {
        studentMapper.delete(id);
    }
}
