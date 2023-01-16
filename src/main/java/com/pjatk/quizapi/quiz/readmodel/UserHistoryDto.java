package com.pjatk.quizapi.quiz.readmodel;

import java.time.LocalDateTime;
import java.util.List;

public record UserHistoryDto(String quizName, LocalDateTime date, List<StatisticDto> statisticDtos) {
    public record StatisticDto(String pathName, String completedPercentage) {}
}
