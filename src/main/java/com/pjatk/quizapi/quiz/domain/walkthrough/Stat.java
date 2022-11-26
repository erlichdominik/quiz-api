package com.pjatk.quizapi.quiz.domain.walkthrough;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
class Stat extends AbstractEntity {
    private long questionId;
    private boolean isCorrect;

    @ManyToOne
    @JoinColumn(name = "walkthrough_id")
    private Walkthrough walkthrough;

    protected Stat() {}

    public Stat(long questionId, boolean isCorrect, Walkthrough walkthrough) {
        this.questionId = questionId;
        this.isCorrect = isCorrect;
        this.walkthrough = walkthrough;
    }

}
