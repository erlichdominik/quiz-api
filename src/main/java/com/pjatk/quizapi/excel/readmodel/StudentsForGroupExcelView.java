package com.pjatk.quizapi.excel.readmodel;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record StudentsForGroupExcelView(Group group) {
    public record Group(String name, LocalDate deadline, LocalDateTime creationOfGroupDate, List<Student> students) {
    }

    public record Student(String username, List<UserHistory> history) {
    }

    public record UserHistory(LocalDateTime date, List<Statistic> statistics) {
    }

    public record Statistic(String pathName, Double completedPercentage) {
    }
}
