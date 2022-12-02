package com.pjatk.quizapi.quiz.readmodel.impl;

import com.pjatk.quizapi.ddd.annotations.application.Finder;
import com.pjatk.quizapi.quiz.readmodel.QuizName;
import com.pjatk.quizapi.quiz.readmodel.QuizNameFinder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Finder
class JpaQuizNameFinder implements QuizNameFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<QuizName> find() {
        String jpql = "select new com.pjatk.quizapi.quiz.readmodel.QuizName(q.id, q.name) from Quiz q";
        TypedQuery<QuizName> query = entityManager.createQuery(jpql, QuizName.class);
        return query.getResultList();
    }
}
