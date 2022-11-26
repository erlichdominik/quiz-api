package com.pjatk.quizapi.quiz.domain.answer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pjatk.quizapi.quiz.domain.question.Question;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
public class Answer extends AbstractEntity {
    private String text;
    @JsonIgnore
    private boolean isTrue;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    protected Answer() {}

}
