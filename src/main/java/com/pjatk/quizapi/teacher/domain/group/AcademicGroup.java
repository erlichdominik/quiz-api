package com.pjatk.quizapi.teacher.domain.group;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
public class AcademicGroup extends AbstractEntity {
    private long teacherId;
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Long> studentIds = new HashSet<>();
    private String code;
    private String name;
    private LocalDate deadline;
    private LocalDate creationDate;

    public AcademicGroup(long teacherId, String name, LocalDate deadline) {
        if (deadline.isBefore(LocalDate.now())) throw new ResponseStatusException(
                HttpStatus.NOT_ACCEPTABLE,
                "Group cannot have deadline before now!"
        );
        if (name.isBlank() || name.isEmpty()) throw new ResponseStatusException(
                HttpStatus.NOT_ACCEPTABLE,
                "Wrong name!"
        );

        this.teacherId = teacherId;
        this.name = name;
        this.deadline = deadline;
        code = UUID.randomUUID().toString();
        this.creationDate = LocalDate.now();
    }

    protected AcademicGroup() {}

    public void addStudentToGroup(long studentId) {
        studentIds.add(studentId);
    }

    public void removeAllStudentsFromTheGroup() {
        studentIds.clear();
    }

    public void removeStudentFromGroup(long studentId) {
        Optional<Long> isPresent = studentIds.stream()
                .filter(it -> it == studentId)
                .findFirst();

        isPresent.map(id -> studentIds.remove(studentId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "student with this id not found in group"));
    }
}
