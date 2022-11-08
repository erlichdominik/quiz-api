package com.pjatk.quizapi.domain;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
class Quiz extends AbstractEntity {
    private String name;

    @OneToMany(mappedBy = "quiz", orphanRemoval = true)
    private Set<Pathway> pathways = new HashSet<>();

    protected Quiz() {}

    public Quiz(String name, Set<Pathway> pathways) {
        this.name = name;
        this.pathways = pathways;
    }
}
