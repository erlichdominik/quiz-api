package com.pjatk.quizapi.quiz.application.commands.handlers;

import com.pjatk.quizapi.sharedkernel.cqrs.annotations.CommandHandlerAnnotation;
import com.pjatk.quizapi.sharedkernel.cqrs.command.handler.CommandHandler;
import com.pjatk.quizapi.quiz.application.commands.DeleteCurrentWalkthroughCommand;
import com.pjatk.quizapi.quiz.domain.walkthrough.WalkthroughRepository;

@CommandHandlerAnnotation
class DeleteCurrentWalkthroughCommandHandler implements CommandHandler<DeleteCurrentWalkthroughCommand, Void> {
    private final WalkthroughRepository walkthroughRepository;

    DeleteCurrentWalkthroughCommandHandler(WalkthroughRepository walkthroughRepository) {
        this.walkthroughRepository = walkthroughRepository;
    }

    @Override
    public Void handle(DeleteCurrentWalkthroughCommand command) {
        walkthroughRepository.deleteById(command.walkthroughId());

        return null;
    }
}
