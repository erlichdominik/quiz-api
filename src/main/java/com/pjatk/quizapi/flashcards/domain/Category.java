package com.pjatk.quizapi.flashcards.domain;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import com.pjatk.quizapi.sharedkernel.Locale;
import lombok.Getter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
public class Category extends AbstractEntity {
    private String category;
    @Enumerated(value = EnumType.STRING)
    private Locale locale;

    @OneToMany(
            mappedBy = "category",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Flashcard> flashcards = new HashSet<>();

    protected Category() {}

    public Category(String category, Set<Flashcard> flashcards) {
        this.category = category;
        this.flashcards = flashcards;
    }
}
