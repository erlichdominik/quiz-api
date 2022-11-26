package com.pjatk.quizapi.quiz.application.engine.impl;

public class QuizNotFoundException extends RuntimeException {
    public QuizNotFoundException(long quizId) {
        super("quiz with id: " + quizId + " was not found", null, false, true);
    }
}
