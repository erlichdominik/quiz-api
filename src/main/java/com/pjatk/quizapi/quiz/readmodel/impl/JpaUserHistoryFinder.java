package com.pjatk.quizapi.quiz.readmodel.impl;

import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import com.pjatk.quizapi.quiz.domain.appuser.UserHistory;
import com.pjatk.quizapi.quiz.readmodel.UserHistoryDto;
import com.pjatk.quizapi.quiz.readmodel.UserHistoryFinder;
import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Finder
class JpaUserHistoryFinder implements UserHistoryFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<UserHistoryDto> findAll() {
        Set<UserHistory> userHistories = fetchUserHistories();

        return userHistories.stream()
                .map(this::map)
                .toList();
    }

    @Override
    public UserHistoryDto find() { //lastscore
        Set<UserHistory> userHistories = fetchUserHistories();

        return userHistories.stream()
                .sorted(Comparator.comparing(AbstractEntity::getId).reversed())
                .map(this::map)
                .findFirst()
                .orElseThrow();
    }

    @Override
    public List<UserHistoryDto> fetchUserHistoriesFor(List<Long> studentsIds) {
        String jpql = """
                select history
                from UserHistory history
                left join fetch history.statistics
                left join fetch history.applicationUser app_user
                left join fetch app_user.user user
                where user in ?1
                """;

        return entityManager.createQuery(jpql, UserHistory.class)
                .setParameter(1, studentsIds)
                .getResultStream()
                .map(this::map)
                .toList();
    }

    private Set<UserHistory> fetchUserHistories() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return getUserHistories(user);
    }

    private Set<UserHistory> getUserHistories(User user) {
        String selectApplicationUserJpql = "select a from ApplicationUser a where a.user.id = ?1";

        TypedQuery<ApplicationUser> selectApplicationUserQuery = entityManager.createQuery(selectApplicationUserJpql, ApplicationUser.class)
                .setParameter(1, user.getId());

        ApplicationUser applicationUser = selectApplicationUserQuery.getResultStream()
                .findFirst()
                .orElseThrow(HistoryNotInitializedException::new);

        return Optional.ofNullable(applicationUser)
                .map(ApplicationUser::getUserHistories)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user doesnt have history"));
    }

    private UserHistoryDto map(UserHistory userHistory) {
        return new UserHistoryDto(userHistory.getQuiz().getName(),
                userHistory.getWalkthroughDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")),
                new ArrayList<>(userHistory
                        .getStatistics()
                        .stream()
                        .map(it -> new UserHistoryDto.StatisticDto(it.getPathName(), String.format(String.valueOf(BigDecimal.valueOf(it.getCompletedPercentage())
                                .setScale(2, RoundingMode.HALF_DOWN)
                        ), "%.2f")))
                        .toList()));
    }
}
