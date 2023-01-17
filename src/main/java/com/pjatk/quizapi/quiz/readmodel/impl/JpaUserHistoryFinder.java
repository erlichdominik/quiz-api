package com.pjatk.quizapi.quiz.readmodel.impl;

import com.pjatk.quizapi.ddd.annotations.application.Finder;
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
    public UserHistoryDto find() {
        Set<UserHistory> userHistories = fetchUserHistories();

        return userHistories.stream()
                .sorted(Comparator.comparing(AbstractEntity::getId).reversed())
                .map(this::map)
                .findFirst()
                .orElseThrow();
    }

    private Set<UserHistory> fetchUserHistories() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

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
