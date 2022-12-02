package com.pjatk.quizapi.quiz.application.commands;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class AnswerNotFoundException extends RuntimeException {
    public AnswerNotFoundException() {
       super("answer with this id was not found in current question", null, false, true);
    }
}
