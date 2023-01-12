package com.pjatk.quizapi.flashcards.domain;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Flashcard extends AbstractEntity {

    private String text;
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    protected Flashcard() {}
}
