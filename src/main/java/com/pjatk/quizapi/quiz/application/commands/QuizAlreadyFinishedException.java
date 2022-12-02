package com.pjatk.quizapi.quiz.application.commands;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class QuizAlreadyFinishedException extends RuntimeException {
    public QuizAlreadyFinishedException() {
        super("quiz is already finished", null, false, true);
    }
}
