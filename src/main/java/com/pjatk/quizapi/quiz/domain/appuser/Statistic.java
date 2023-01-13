package com.pjatk.quizapi.quiz.domain.appuser;

import com.pjatk.quizapi.sharedkernel.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Statistic statistic = (Statistic) o;
        return Double.compare(statistic.completedPercentage, completedPercentage) == 0 && Objects.equals(pathName, statistic.pathName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), pathName, completedPercentage);
    }
}
