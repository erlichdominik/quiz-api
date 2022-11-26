package com.pjatk.quizapi.quiz.application.commands;

import com.pjatk.quizapi.cqrs.annotations.Command;

@Command
public record DeleteQuizCommand(long id) {
}