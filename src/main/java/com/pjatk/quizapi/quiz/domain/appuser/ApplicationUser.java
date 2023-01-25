package com.pjatk.quizapi.quiz.domain.appuser;

import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.security.User.AccountState;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Entity
public class ApplicationUser extends AbstractEntity {
    public static final int AMOUNT_OF_EXAM_ATTEMPTS = 1;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Walkthrough currentWalkthrough;
    @OneToMany(mappedBy = "applicationUser", cascade = CascadeType.ALL)
    @Getter
    private Set<UserHistory> userHistories = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Integer walkthroughExamCounter;

    public ApplicationUser(User user) {
        this.user = user;
    }

    public void addUserHistory(UserHistory userHistory) {
        requireCorrectAmountOfAttemptsIfInExamMode();

        userHistories.add(userHistory);
        userHistory.assignApplicationUser(this);
    }

    public void setWalkthrough(Walkthrough walkthrough) {
        currentWalkthrough = walkthrough;
        walkthrough.setAppUser(this);
    }

    public Optional<Walkthrough> getCurrentWalkthrough() {
        return Optional.ofNullable(currentWalkthrough);
    }

    public void clearCounter() {
        walkthroughExamCounter = null;
    }

    protected ApplicationUser() {
    }

    private void requireCorrectAmountOfAttemptsIfInExamMode() {
        AccountState accountState = user.getAccountState();
        if (accountState == AccountState.EXAM) {
            if (walkthroughExamCounter == null) {
                walkthroughExamCounter = 1;
            } else {
                walkthroughExamCounter++;
                if (walkthroughExamCounter > AMOUNT_OF_EXAM_ATTEMPTS) {
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
                            "You finished all your attempts!");
                }
            }

        }
    }

}
