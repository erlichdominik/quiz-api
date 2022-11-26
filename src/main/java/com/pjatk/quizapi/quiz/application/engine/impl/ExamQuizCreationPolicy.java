package com.pjatk.quizapi.quiz.application.engine.impl;

import com.pjatk.quizapi.ddd.annotations.application.ApplicationPolicy;
import com.pjatk.quizapi.quiz.application.engine.QuizCreationPolicy;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUserRepository;
import com.pjatk.quizapi.quiz.domain.pathway.Pathway;
import com.pjatk.quizapi.quiz.domain.pathway.SubPathway;
import com.pjatk.quizapi.quiz.domain.quiz.Quiz;
import com.pjatk.quizapi.quiz.domain.quiz.QuizId;
import com.pjatk.quizapi.quiz.domain.quiz.QuizRepository;
import com.pjatk.quizapi.quiz.domain.walkthrough.QuestionsIndex;
import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.quiz.domain.walkthrough.WalkthroughRepository;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@ApplicationPolicy
public class ExamQuizCreationPolicy implements QuizCreationPolicy {
    private final QuizRepository quizRepository;
    private final WalkthroughRepository walkthroughRepository;
    private final ApplicationUserRepository applicationUserRepository;

    public ExamQuizCreationPolicy(QuizRepository quizRepository, WalkthroughRepository walkthroughRepository, ApplicationUserRepository applicationUserRepository) {
        this.quizRepository = quizRepository;
        this.walkthroughRepository = walkthroughRepository;
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    public Walkthrough createWalkthrough(ApplicationUser user, long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNotFoundException(quizId));

        List<QuestionsIndex> questionsIndices = new ArrayList<>();

        Set<Pathway> pathways = quiz.getPathways();

        user.getCurrentWalkthrough().ifPresent(it -> {
            walkthroughRepository.deleteById(it.getId());
            applicationUserRepository.save(user);
        });


        for (Pathway pathway :
                pathways) {
            QuestionsIndex questionsIndex = new QuestionsIndex(
                    pathway.getQuestions()
                            .stream()
                            .map(AbstractEntity::getId)
                            .toList()
            );

            questionsIndices.add(questionsIndex);

            List<QuestionsIndex> indices = new ArrayList<>(pathway.getSubPathways()
                    .stream()
                    .map(SubPathway::getQuestions)
                    .map(it -> it
                            .stream()
                            .map(AbstractEntity::getId)
                    )
                    .map(it -> new QuestionsIndex(it.toList())).toList());

            Collections.shuffle(indices);

            questionsIndices.addAll(indices);

        }

        var walkthrough = new Walkthrough(questionsIndices, new QuizId(quizId));

        return walkthroughRepository.save(walkthrough);
    }

}
