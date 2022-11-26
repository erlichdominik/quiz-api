package com.pjatk.quizapi.quiz.domain.appuser;

import com.pjatk.quizapi.quiz.domain.quiz.Quiz;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class UserHistory extends AbstractEntity {
    @OneToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @OneToMany(mappedBy = "userHistory", fetch = FetchType.EAGER)
    private Set<Statistic> statistics = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private ApplicationUser applicationUser;

    public UserHistory(Quiz quiz) {
        this.quiz = quiz;
    }

    public void addStatistic(Statistic statistic) {
        statistics.add(statistic);
        statistic.assignUserHistory(this);
    }

    void assignApplicationUser(ApplicationUser applicationUser) {
       this.applicationUser = applicationUser;
    }

    protected UserHistory() {}
}
