package com.pjatk.quizapi.sharedkernel.cqrs.command;

public interface Gate {
    Object dispatch(Object command);
}
