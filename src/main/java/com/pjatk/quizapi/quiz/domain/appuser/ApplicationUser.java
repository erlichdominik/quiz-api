package com.pjatk.quizapi.quiz.domain.appuser;

import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Entity
public class ApplicationUser extends AbstractEntity {
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Walkthrough currentWalkthrough;
    @OneToMany(mappedBy = "applicationUser")
    @Getter
    private Set<UserHistory> userHistories = new HashSet<>();

    @OneToOne(mappedBy = "applicationUser")
    private User user;

    public ApplicationUser(Walkthrough currentWalkthrough, Set<UserHistory> userHistories) {
        this.currentWalkthrough = currentWalkthrough;
        this.userHistories = userHistories;
    }

    public ApplicationUser(User user) {
        this.user = user;
    }

    public void addUserHistory(UserHistory userHistory) {
        userHistories.add(userHistory);
        userHistory.assignApplicationUser(this);
    }

    public Optional<Walkthrough> getCurrentWalkthrough() {
        return Optional.ofNullable(currentWalkthrough);
    }

    protected ApplicationUser() {}

}
