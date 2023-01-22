package com.pjatk.quizapi.flashcards.readmodel.impl;

import com.pjatk.quizapi.sharedkernel.Locale;
import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;
import com.pjatk.quizapi.flashcards.readmodel.Topic;
import com.pjatk.quizapi.flashcards.readmodel.TopicFinder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Finder
class JpaTopicFinder implements TopicFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Topic> findAll(Locale locale) {
        var jpql = """
                select new
                com.pjatk.quizapi.flashcards.readmodel.Topic(cat.id, cat.category)
                from Category cat
                where cat.locale = ?1
                """;

        return entityManager.createQuery(jpql, Topic.class)
                .setParameter(1, locale)
                .getResultList();
    }
}
