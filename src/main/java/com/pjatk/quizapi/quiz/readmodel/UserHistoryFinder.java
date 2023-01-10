package com.pjatk.quizapi.quiz.readmodel;

import java.util.List;

public interface UserHistoryFinder {
    List<UserHistoryDto> findAll();
    UserHistoryDto find();
}
