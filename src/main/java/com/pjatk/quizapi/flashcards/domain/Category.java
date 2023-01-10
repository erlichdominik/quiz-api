package com.pjatk.quizapi.flashcards.domain;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
public class Category extends AbstractEntity {
    private String name;

    @OneToMany(
            mappedBy = "category",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Flashcard> flashcards = new HashSet<>();

    protected Category() {}

    public Category(String name, Set<Flashcard> flashcards) {
        this.name = name;
        this.flashcards = flashcards;
    }
}
