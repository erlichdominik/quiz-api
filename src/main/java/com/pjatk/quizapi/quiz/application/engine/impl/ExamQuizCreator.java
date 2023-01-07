package com.pjatk.quizapi.quiz.application.engine.impl;

import com.pjatk.quizapi.quiz.application.engine.QuizCreator;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUserRepository;
import com.pjatk.quizapi.quiz.domain.quiz.Quiz;
import com.pjatk.quizapi.quiz.domain.quiz.QuizRepository;
import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.quiz.domain.walkthrough.WalkthroughFactory;
import com.pjatk.quizapi.quiz.domain.walkthrough.WalkthroughRepository;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class ExamQuizCreator implements QuizCreator {
    private final QuizRepository quizRepository;
    private final WalkthroughRepository walkthroughRepository;
    private final ApplicationUserRepository applicationUserRepository;

    public ExamQuizCreator(QuizRepository quizRepository, WalkthroughRepository walkthroughRepository, ApplicationUserRepository applicationUserRepository) {
        this.quizRepository = quizRepository;
        this.walkthroughRepository = walkthroughRepository;
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    public Walkthrough createWalkthrough(ApplicationUser user, long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNotFoundException(quizId));

        user.getCurrentWalkthrough().ifPresent(this::deleteWalkthrough);

        Walkthrough walkthrough = new WalkthroughFactory().fromQuiz(quiz);

        user.setWalkthrough(walkthrough);
        applicationUserRepository.save(user);
        return user.getCurrentWalkthrough().orElseThrow(IllegalStateException::new);
    }

    private void deleteWalkthrough(Walkthrough walkthrough) {
        walkthroughRepository.deleteById(walkthrough.getId());
    }

}
