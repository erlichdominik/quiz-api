package com.pjatk.quizapi.quiz.domain.pathway;

import com.pjatk.quizapi.quiz.domain.question.Question;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;
import org.hibernate.annotations.OrderBy;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "subpathway")
@Getter
public class SubPathway extends AbstractEntity {
    protected SubPathway () {}

    @ManyToOne
    @JoinColumn(name = "pathway_id")
    private Pathway pathway;

    @OneToMany(mappedBy = "subPathway")
    @Getter
    @OrderBy(clause = "id ASC")
    private Set<Question> questions = new HashSet<>();
}
