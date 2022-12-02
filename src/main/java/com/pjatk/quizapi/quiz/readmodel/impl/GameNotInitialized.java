package com.pjatk.quizapi.quiz.readmodel.impl;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
public class GameNotInitialized extends RuntimeException {
    public GameNotInitialized() {
        super("Quiz not initialized!", null, false, true);
    }
}
