package com.pjatk.quizapi.quiz.domain.question;

import com.pjatk.quizapi.quiz.domain.answer.Answer;
import com.pjatk.quizapi.quiz.domain.pathway.Pathway;
import com.pjatk.quizapi.quiz.domain.pathway.SubPathway;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
public class Question extends AbstractEntity {
    private String comment;
    private String text;

    @OneToMany(mappedBy = "question", fetch = FetchType.EAGER, orphanRemoval = true)
    private Set<Answer> answers = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "pathway_id")
    private Pathway pathway;

    @ManyToOne
    @JoinColumn(name = "subpathway_id")
    private SubPathway subPathway;

    protected Question() {}

    public Answer getCorrectAnswer() {
        return answers.stream().filter(Answer::isTrue)
                .findFirst().orElseThrow(() -> new CorrectAnswerInQuestionNotFoundException(getId()));
    }

}
