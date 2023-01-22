package com.pjatk.quizapi.quiz.application.commands.handlers;

import com.pjatk.quizapi.api.dto.QuestionNotFoundException;
import com.pjatk.quizapi.sharedkernel.cqrs.annotations.CommandHandlerAnnotation;
import com.pjatk.quizapi.sharedkernel.cqrs.command.handler.CommandHandler;
import com.pjatk.quizapi.quiz.application.HistoryManager;
import com.pjatk.quizapi.quiz.application.commands.AnswerNotFoundException;
import com.pjatk.quizapi.quiz.application.commands.UpdateWalkthroughCommand;
import com.pjatk.quizapi.quiz.domain.answer.AnswerValidator;
import com.pjatk.quizapi.quiz.domain.question.Question;
import com.pjatk.quizapi.quiz.domain.question.QuestionRepository;
import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.quiz.domain.walkthrough.WalkthroughRepository;
import com.pjatk.quizapi.sharedkernel.EntityNotFoundException;

@CommandHandlerAnnotation
class UpdateWalkthroughCommandHandler implements CommandHandler<UpdateWalkthroughCommand, Void> {
    private final WalkthroughRepository walkthroughRepository;
    private final QuestionRepository questionRepository;
    private final AnswerValidator answerValidator;
    private final HistoryManager historyManager;

    UpdateWalkthroughCommandHandler(WalkthroughRepository walkthroughRepository, QuestionRepository questionRepository, AnswerValidator answerValidator, HistoryManager historyManager) {
        this.walkthroughRepository = walkthroughRepository;
        this.questionRepository = questionRepository;
        this.answerValidator = answerValidator;
        this.historyManager = historyManager;
    }

    @Override
    public Void handle(UpdateWalkthroughCommand command) {

        Walkthrough walkthrough = walkthroughRepository
                .findById(command.walkthroughId())
                .orElseThrow(() -> new EntityNotFoundException(Walkthrough.class, command.walkthroughId()));

        Question question = questionRepository
                .findById(walkthrough.getCurrentQuestionId().questionId())
                .orElseThrow(QuestionNotFoundException::new);

        if (isNoneQuestionMatch(command, question)) throw new AnswerNotFoundException();

        boolean isAnswerCorrect = answerValidator.validate(command.answerId());

        boolean hasNext = walkthrough.hasNext(isAnswerCorrect);

        if (hasNext) walkthrough.next(isAnswerCorrect);

        if (walkthrough.isWalkthroughOver()) historyManager.storeHistory(walkthrough);

        return null;
    }

    private static boolean isNoneQuestionMatch(UpdateWalkthroughCommand command, Question question) {
        return question.getAnswers().stream()
                .noneMatch(it -> it.getId() == command.answerId());
    }
}
