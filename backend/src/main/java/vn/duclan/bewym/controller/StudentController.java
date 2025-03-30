package vn.duclan.bewym.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.duclan.bewym.dto.request.StudentCreateRequest;
import vn.duclan.bewym.dto.response.ApiResponse;
import vn.duclan.bewym.models.Student;
import vn.duclan.bewym.service.StudentService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/public/student")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping("getLst")
    public List<Student> getLstStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable int id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public ApiResponse<Student> createStudent(@RequestBody StudentCreateRequest student) {
        return ApiResponse.<Student>builder().data(studentService.createStudent(student)).success(true).build();
    }

}
