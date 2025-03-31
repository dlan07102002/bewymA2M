package vn.duclan.bewym.mapper;

import java.util.Set;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import vn.duclan.bewym.dto.response.StudentsResponse;
import vn.duclan.bewym.models.Student;

@Mapper
public interface StudentMapper {
    @Select("SELECT * FROM students WHERE id = #{id}")
    Student getStudentDetail(@Param("id") Long id);

    @Select("SELECT * FROM students WHERE id = #{id}")
    Student findById(Long id);

    // Truy vấn danh sách sinh viên, ánh xạ vào Set<Student>
    @Select({
            "<script>",
            "SELECT id, fullName, dob, address, createdAt FROM students",
            "WHERE fullName LIKE CONCAT('%', #{keySearch}, '%')",
            "ORDER BY id ASC",
            "LIMIT #{limit} OFFSET #{offset}",
            "</script>"
    })
    Set<Student> findStudents(@Param("keySearch") String keySearch,
            @Param("limit") int limit,
            @Param("offset") int offset);

    // Truy vấn tổng số bản ghi
    @Select({
            "<script>",
            "SELECT COUNT(*) FROM students",
            "WHERE fullName LIKE CONCAT('%', #{keySearch}, '%')",
            "</script>"
    })
    int count(@Param("keySearch") String keySearch);

    @Insert("INSERT INTO students(fullName, dob, address ) VALUES(#{fullName}, #{dob}, #{address})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Student student);

    @Update({
            "<script>",
            "UPDATE students",
            "<set>",
            "<if test='fullName != null and fullName != \"\"'>fullName=#{fullName},</if>",
            "<if test='dob != null'>dob=#{dob},</if>",
            "<if test='address != null and address != \"\"'>address=#{address},</if>",
            "</set>",
            "WHERE id=#{id}",
            "</script>"
    })
    void update(Student student);

    @Delete("DELETE FROM students WHERE id=#{id}")
    void delete(int id);
}