package com.pjatk.quizapi.teacher.readmodel;

import java.util.List;

public record StudentsForGroup(List<Student> students) {
    public record Student(long id, String username) {}
}
