package com.pjatk.quizapi.quiz.application.commands;

import com.pjatk.quizapi.sharedkernel.cqrs.annotations.Command;

@Command
public record DeleteQuizCommand(long id) {
}