package com.pjatk.quizapi.quiz.domain.appuser;

import com.pjatk.quizapi.quiz.domain.quiz.Quiz;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class UserHistory extends AbstractEntity {
    @OneToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @OneToMany(mappedBy = "userHistory", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Statistic> statistics = new HashSet<>();

    private LocalDateTime walkthroughDate;
    private boolean wasInExam;

    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private ApplicationUser applicationUser;

    public UserHistory(Quiz quiz, boolean wasInExam) {
        this.quiz = quiz;
        walkthroughDate = LocalDateTime.now();
        this.wasInExam = wasInExam;
    }

    public void addStatistic(Statistic statistic) {
        statistic.assignUserHistory(this);
        statistics.add(statistic);
        walkthroughDate = LocalDateTime.now();
    }

    void assignApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }

    protected UserHistory() {
    }

    public LocalDateTime getWalkthroughDate() {
        return walkthroughDate;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public Set<Statistic> getStatistics() {
        return new HashSet<>(statistics);
    }
}

