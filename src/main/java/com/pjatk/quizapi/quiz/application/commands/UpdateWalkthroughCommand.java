package com.pjatk.quizapi.quiz.application.commands;

import com.pjatk.quizapi.sharedkernel.cqrs.annotations.Command;

@Command
public record UpdateWalkthroughCommand(long walkthroughId, long answerId) {
}
