package com.pjatk.quizapi.teacher.domain.group;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
public class AcademicGroup extends AbstractEntity {
    private long teacherId;
    @ElementCollection
    private Set<Long> studentIds = new HashSet<>();
    private String code;
    private String name;

    public AcademicGroup(long teacherId, String name) {
        this.teacherId = teacherId;
        this.name = name;
        code = UUID.randomUUID().toString();
    }

    protected AcademicGroup() {}

    public void addStudentToGroup(long studentId) {
        studentIds.add(studentId);
    }
}
