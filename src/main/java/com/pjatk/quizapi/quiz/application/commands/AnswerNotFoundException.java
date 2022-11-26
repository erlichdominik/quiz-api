package com.pjatk.quizapi.quiz.application.commands;

public class AnswerNotFoundException extends RuntimeException {
    public AnswerNotFoundException() {
       super("answer with this id was not found in current question", null, false, true);
    }
}
