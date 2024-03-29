package com.pjatk.quizapi.quiz.readmodel;

import java.util.List;

public record UserHistoryDto(String quizName, String date, List<StatisticDto> statisticDtos) {
    public record StatisticDto(String pathName, String completedPercentage) {}
}
