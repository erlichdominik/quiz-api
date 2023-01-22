package com.pjatk.quizapi.quiz.readmodel.impl;

import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;
import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.quiz.readmodel.QuizState;
import com.pjatk.quizapi.quiz.readmodel.QuizStateFinder;
import com.pjatk.quizapi.quiz.readmodel.QuizStateRequest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Finder
class JpaQuizStateFinder implements QuizStateFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public QuizState find(QuizStateRequest request) {
        String jpql = "select w from Walkthrough w where w.id = ?1";

        TypedQuery<Walkthrough> walkthroughTypedQuery = entityManager.createQuery(jpql, Walkthrough.class)
                .setParameter(1, request.walkthroughId());

        Walkthrough walkthrough = walkthroughTypedQuery.getSingleResult();

        return new QuizState(walkthrough.isWalkthroughOver());
    }
}
