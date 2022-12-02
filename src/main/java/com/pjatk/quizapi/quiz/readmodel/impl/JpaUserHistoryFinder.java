package com.pjatk.quizapi.quiz.readmodel.impl;

import com.pjatk.quizapi.ddd.annotations.application.Finder;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import com.pjatk.quizapi.quiz.domain.appuser.UserHistory;
import com.pjatk.quizapi.quiz.readmodel.UserHistoryDto;
import com.pjatk.quizapi.quiz.readmodel.UserHistoryFinder;
import com.pjatk.quizapi.security.User;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Finder
class JpaUserHistoryFinder implements UserHistoryFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<UserHistoryDto> find() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String selectApplicationUserJpql = "select a from ApplicationUser a where a.user.id = ?1";

        TypedQuery<ApplicationUser> selectApplicationUserQuery = entityManager.createQuery(selectApplicationUserJpql, ApplicationUser.class)
                        .setParameter(1, user.getId());

        ApplicationUser applicationUser = selectApplicationUserQuery.getResultStream()
                .findFirst()
                .orElseThrow(HistoryNotInitializedException::new);

        Set<UserHistory> userHistories = Optional.ofNullable(applicationUser)
                .map(ApplicationUser::getUserHistories)
                .orElse(Set.of());

        return userHistories.stream()
                .map(this::map)
                .toList();
    }

    private UserHistoryDto map(UserHistory userHistory) {
        return new UserHistoryDto(userHistory.getQuiz().getName(), new ArrayList<>(userHistory
                .getStatistics()
                .stream()
                .map(it -> new UserHistoryDto.StatisticDto(it.getPathName(), String.valueOf(it.getCompletedPercentage())))
                .toList()));
    }
}
