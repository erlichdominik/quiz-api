package com.pjatk.quizapi.quiz.domain.quiz;

import com.pjatk.quizapi.quiz.domain.pathway.Pathway;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
public class Quiz extends AbstractEntity {
    private String name;

    @OneToMany(mappedBy = "quiz", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Pathway> pathways = new HashSet<>();

    protected Quiz() {}

    protected Quiz(String name, Set<Pathway> pathways) {
        this.name = name;
        this.pathways = pathways;
    }

    public void addPathway(Pathway pathway) {
        pathways.add(pathway);
        pathway.assignToQuiz(this);
    }
}
