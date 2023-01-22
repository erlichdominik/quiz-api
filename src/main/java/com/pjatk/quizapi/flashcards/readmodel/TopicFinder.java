package com.pjatk.quizapi.flashcards.readmodel;

import com.pjatk.quizapi.sharedkernel.Locale;

import java.util.List;

public interface TopicFinder {
    List<Topic> findAll(Locale locale);
}
