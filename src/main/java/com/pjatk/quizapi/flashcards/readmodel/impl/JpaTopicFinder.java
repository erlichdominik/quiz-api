package com.pjatk.quizapi.flashcards.readmodel.impl;

import com.pjatk.quizapi.sharedkernel.annotations.application.Finder;
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
    public List<Topic> findAll() {
        var jpql = """
                select new
                com.pjatk.quizapi.flashcards.readmodel.Topic(cat.id, cat.category)
                from Category cat
                """;

        return entityManager.createQuery(jpql, Topic.class)
                .getResultList();
    }
}
