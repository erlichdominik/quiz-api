package com.pjatk.quizapi.quiz.domain.walkthrough;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Stat extends AbstractEntity {
    @Getter
    private long questionId;
    @Getter
    private boolean isCorrect;

    @Getter
    private long pathwayId;

    @ManyToOne
    @JoinColumn(name = "walkthrough_id")
    private Walkthrough walkthrough;

    protected Stat() {}

    public Stat(long questionId, boolean isCorrect, Walkthrough walkthrough, long pathwayId) {
        this.questionId = questionId;
        this.isCorrect = isCorrect;
        this.walkthrough = walkthrough;
        this.pathwayId = pathwayId;
    }

}
