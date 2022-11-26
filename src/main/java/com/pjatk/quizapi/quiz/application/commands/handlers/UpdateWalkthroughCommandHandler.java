package com.pjatk.quizapi.quiz.application.commands.handlers;

import com.pjatk.quizapi.api.dto.QuestionNotFoundException;
import com.pjatk.quizapi.cqrs.annotations.CommandHandlerAnnotation;
import com.pjatk.quizapi.cqrs.command.handler.CommandHandler;
import com.pjatk.quizapi.quiz.application.commands.AnswerNotFoundException;
import com.pjatk.quizapi.quiz.application.commands.UpdateWalkthroughCommand;
import com.pjatk.quizapi.quiz.application.engine.impl.QuizNotFoundException;
import com.pjatk.quizapi.quiz.domain.answer.AnswerValidator;
import com.pjatk.quizapi.quiz.domain.appuser.UserHistory;
import com.pjatk.quizapi.quiz.domain.question.Question;
import com.pjatk.quizapi.quiz.domain.question.QuestionRepository;
import com.pjatk.quizapi.quiz.domain.quiz.Quiz;
import com.pjatk.quizapi.quiz.domain.quiz.QuizRepository;
import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.quiz.domain.walkthrough.WalkthroughRepository;
import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.sharedkernel.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;

@CommandHandlerAnnotation
class UpdateWalkthroughCommandHandler implements CommandHandler<UpdateWalkthroughCommand, Void> {
    private final WalkthroughRepository walkthroughRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final AnswerValidator answerValidator;

    UpdateWalkthroughCommandHandler(WalkthroughRepository walkthroughRepository, QuizRepository quizRepository, QuestionRepository questionRepository, AnswerValidator answerValidator) {
        this.walkthroughRepository = walkthroughRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.answerValidator = answerValidator;
    }

    @Override
    public Void handle(UpdateWalkthroughCommand command) {

        Walkthrough walkthrough = walkthroughRepository.findById(command.walkthroughId())
                .orElseThrow(() -> new EntityNotFoundException(Walkthrough.class, command.walkthroughId()));

        Question question = questionRepository.findById(walkthrough.getCurrentQuestionId().questionId())
                .orElseThrow(() -> {
                    throw new QuestionNotFoundException();
                });

        if (question.getAnswers().stream()
                .noneMatch(it -> it.getId() == command.answerId())) {
            throw new AnswerNotFoundException();
        }

        boolean isAnswerCorrect = answerValidator.validate(command.answerId());

        boolean hasNext = walkthrough.hasNext(isAnswerCorrect);

        if (hasNext) walkthrough.next(isAnswerCorrect);


        // TODO: 26/11/2022 user history
        if (!hasNext && walkthrough.isWalkthroughOver()) {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            user.getApplicationUser()
                    .ifPresent(it -> {
                        Quiz quiz = quizRepository.findById(walkthrough.getQuizId().getValue())
                                .orElseThrow(() -> new QuizNotFoundException(walkthrough.getQuizId().getValue()));

                        UserHistory userHistory = new UserHistory(quiz);
                    });
        }

        return null;
    }
}
