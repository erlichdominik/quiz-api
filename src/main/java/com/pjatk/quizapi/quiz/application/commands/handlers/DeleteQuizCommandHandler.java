package com.pjatk.quizapi.quiz.application.commands.handlers;

import com.pjatk.quizapi.cqrs.annotations.CommandHandlerAnnotation;
import com.pjatk.quizapi.cqrs.command.handler.CommandHandler;
import com.pjatk.quizapi.quiz.application.commands.DeleteQuizCommand;
import com.pjatk.quizapi.quiz.domain.quiz.QuizRepository;

@CommandHandlerAnnotation
class DeleteQuizCommandHandler implements CommandHandler<DeleteQuizCommand, Void> {
    private final QuizRepository quizRepository;

    DeleteQuizCommandHandler(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @Override
    public Void handle(DeleteQuizCommand command) {
        quizRepository.deleteById(command.id());
        return null;
    }
}
