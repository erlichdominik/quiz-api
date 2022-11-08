package com.pjatk.quizapi.domain;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
class Question extends AbstractEntity {
    private int questionNumber;

    private String comment;
    private String text;

    @ManyToOne
    @JoinColumn(name = "pathway_id")
    private Pathway pathway;

    @OneToMany(mappedBy = "question", fetch = FetchType.EAGER, orphanRemoval = true)
    private Set<Answer> answers = new HashSet<>();

    protected Question() {}


}
