package vn.duclan.bewym.service.impl;

import org.springframework.stereotype.Service;

import vn.duclan.bewym.dto.request.StudentCreateRequest;
import vn.duclan.bewym.mapper.StudentMapper;
import vn.duclan.bewym.models.Student;
import vn.duclan.bewym.service.StudentService;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentMapper studentMapper;

    public StudentServiceImpl(StudentMapper studentMapper) {
        this.studentMapper = studentMapper;
    }

    public List<Student> getAllStudents() {
        return studentMapper.findAll();
    }

    public Student getStudentById(int id) {
        return studentMapper.findById(id);
    }

    public Student createStudent(StudentCreateRequest request) {
        Student student = new Student();
        student.setFullName(request.getFullName());
        student.setAddress(request.getAddress());
        student.setDob(request.getDob());

        studentMapper.insert(student);

        return student;
    }

    public void updateStudent(Student student) {
        studentMapper.update(student);
    }

    public void deleteStudent(int id) {
        studentMapper.delete(id);
    }
}
