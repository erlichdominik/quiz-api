package com.pjatk.quizapi.quiz.readmodel.impl;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NO_CONTENT)
public class HistoryNotInitializedException extends RuntimeException {
    public HistoryNotInitializedException() {
        super("History is empty!", null, false, true);
    }
}
