package com.pjatk.quizapi.cqrs.command;

public interface Gate {
    Object dispatch(Object command);
}
