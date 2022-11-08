package com.pjatk.quizapi.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
class Answer extends AbstractEntity {
    private String text;
    @JsonIgnore
    private boolean isTrue;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    protected Answer() {}

}
