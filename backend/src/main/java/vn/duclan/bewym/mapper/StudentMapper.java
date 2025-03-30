package vn.duclan.bewym.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;

import vn.duclan.bewym.models.Student;

@Mapper
public interface StudentMapper {
    @Select("SELECT * FROM students WHERE id = #{id}")
    Student getStudentDetail(@Param("id") Long id);

    @Select("SELECT * FROM students WHERE id = #{id}")
    Student findById(int id);

    @Select("SELECT * FROM students")
    List<Student> findAll();

    @Insert("INSERT INTO students(fullName, dob, address ) VALUES(#{fullName}, #{dob}, #{address})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Student student);

    @Update("UPDATE students SET fullName=#{fullName}, dob=#{dob}, address=#{address} WHERE id=#{id}")
    void update(Student student);

    @Delete("DELETE FROM students WHERE id=#{id}")
    void delete(int id);
}