package com.pjatk.quizapi.quiz.domain.pathway;

import com.pjatk.quizapi.quiz.domain.question.Question;
import com.pjatk.quizapi.quiz.domain.quiz.Quiz;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;
import org.hibernate.annotations.OrderBy;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
public class Pathway extends AbstractEntity {
    private long pathwayNumber;
    private Long nextPathwayNumber;
    private String pathwayName;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @OneToMany(mappedBy = "pathway", fetch = FetchType.EAGER)
    private Set<SubPathway> subPathways = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, orphanRemoval = true, mappedBy = "pathway")
    @OrderBy(clause = "id ASC")
    private Set<Question> questions = new HashSet<>();

    public void assignToQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

}
