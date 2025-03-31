package vn.duclan.bewym.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.duclan.bewym.dto.request.StudentSaveRequest;
import vn.duclan.bewym.dto.response.ApiResponse;
import vn.duclan.bewym.dto.response.StudentsResponse;
import vn.duclan.bewym.models.Student;
import vn.duclan.bewym.service.StudentService;

import java.util.Set;

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
    public ApiResponse<StudentsResponse> getLstStudents(
            @RequestParam(name = "_keySearch", defaultValue = "") String keySearch,
            @RequestParam(name = "_limit", defaultValue = "10") int limit,
            @RequestParam(name = "_offset", defaultValue = "0") int offset) {
        return ApiResponse.<StudentsResponse>builder().success(true)
                .data(studentService.getStudents(keySearch, limit, offset))
                .build();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public ApiResponse<Student> saveStudent(@RequestBody StudentSaveRequest student) {
        return ApiResponse.<Student>builder().data(studentService.saveStudent(student)).success(true).build();
    }

}
