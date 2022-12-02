package com.pjatk.quizapi.quiz.application;

import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;

public interface HistoryManager {
    void storeHistory(Walkthrough walkthrough);
}
