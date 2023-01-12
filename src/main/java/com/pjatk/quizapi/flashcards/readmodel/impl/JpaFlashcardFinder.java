package com.pjatk.quizapi.flashcards.readmodel.impl;

import com.pjatk.quizapi.ddd.annotations.application.Finder;
import com.pjatk.quizapi.flashcards.readmodel.Hint;
import com.pjatk.quizapi.flashcards.readmodel.FlashcardFinder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Finder
class JpaFlashcardFinder implements FlashcardFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Hint> findAll(long topicId) {
        var jpql = """
                select new com.pjatk.quizapi.flashcards.readmodel.Hint(f.id, f.description, f.text)
                from Flashcard f
                left join f.category
                where f.category.id = ?1
                
                """;

        return entityManager.createQuery(jpql, Hint.class)
                .setParameter(1, topicId)
                .getResultList();
    }
}
