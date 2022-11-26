package com.pjatk.quizapi.quiz.application.commands;

import com.pjatk.quizapi.cqrs.annotations.Command;
import com.pjatk.quizapi.quiz.domain.quiz.QuizMode;

@Command
public record InitQuizCommand(QuizMode quizMode, long quizId) {
}
