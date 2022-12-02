package com.pjatk.quizapi.quiz.domain.appuser;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Statistic extends AbstractEntity {
    private String pathName;
    private double completedPercentage;

    @ManyToOne
    @JoinColumn(name = "userhistory_id")
    private UserHistory userHistory;

    public Statistic(String pathName, double completedPercentage) {
        this.pathName = pathName;
        this.completedPercentage = completedPercentage;
    }

    protected Statistic() {
    }

    void assignUserHistory(UserHistory userHistory) {
        this.userHistory = userHistory;
    }

    public String getPathName() {
        return pathName;
    }

    public double getCompletedPercentage() {
        return completedPercentage;
    }
}
