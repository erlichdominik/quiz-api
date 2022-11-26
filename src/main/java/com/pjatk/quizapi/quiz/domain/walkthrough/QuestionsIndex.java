package com.pjatk.quizapi.quiz.domain.walkthrough;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import org.hibernate.annotations.Sort;

import javax.persistence.*;
import java.util.*;

@Entity
public class QuestionsIndex extends AbstractEntity {
    @OrderColumn
//    @JoinColumn
    @ElementCollection
    @Sort
//    @org.hibernate.annotations.OrderBy(clause = "ASC")
    private List<Long> questionsId = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "walkthrough_id")
    private Walkthrough walkthrough;

    public QuestionsIndex(Collection<Long> questionsId) {
        this.questionsId = new ArrayList<>(questionsId);
    }

    protected QuestionsIndex() {}

    @PrePersist
    private void prePersist() {

    }

    public List<Long> getQuestionsId() {
        return new ArrayList<>(questionsId);
    }
}
