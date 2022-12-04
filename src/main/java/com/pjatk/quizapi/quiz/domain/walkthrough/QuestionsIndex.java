package com.pjatk.quizapi.quiz.domain.walkthrough;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Sort;

import javax.persistence.*;
import java.util.*;

@Entity
public class QuestionsIndex extends AbstractEntity {
    @OrderColumn
    @ElementCollection
    @Sort
    private List<Long> questionsId = new ArrayList<>();

    @ManyToOne
    @Setter
    @JoinColumn(name = "walkthrough_id")
    private Walkthrough walkthrough;

    @Getter
    private long pathwayId;

    public QuestionsIndex(List<Long> questionsId, long pathwayId) {
        this.questionsId = questionsId;
        this.pathwayId = pathwayId;
    }

    protected QuestionsIndex() {}

    public List<Long> getQuestionsId() {
        return new ArrayList<>(questionsId);
    }
}
