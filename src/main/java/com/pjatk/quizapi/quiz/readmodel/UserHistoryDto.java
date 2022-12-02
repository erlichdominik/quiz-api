package com.pjatk.quizapi.quiz.readmodel;

import java.util.List;

public record UserHistoryDto(String quizName, List<StatisticDto> statisticDtos) {
    public record StatisticDto(String pathName, String completedPercentage) {}
}
