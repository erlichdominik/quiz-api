package com.pjatk.quizapi.flashcards.readmodel;

import java.util.List;

public interface FlashcardFinder {
    List<Hint> findAll(long topicId);
}
