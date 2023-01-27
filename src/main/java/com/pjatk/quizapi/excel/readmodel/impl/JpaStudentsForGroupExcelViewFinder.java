package com.pjatk.quizapi.excel.readmodel.impl;

import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelFinder;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView;
import com.pjatk.quizapi.quiz.readmodel.UserHistoryFinder;
import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;
import com.pjatk.quizapi.teacher.domain.group.AcademicGroup;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Finder
class JpaStudentsForGroupExcelViewFinder implements StudentsForGroupExcelFinder {
    public static final String SELECT_GROUP_QUERY = """
            select group
            from  AcademicGroup group
            where group.id = ?1
            """;
    @PersistenceContext
    private EntityManager entityManager;
    private final UserHistoryFinder userHistoryFinder;

    JpaStudentsForGroupExcelViewFinder(UserHistoryFinder userHistoryFinder) {
        this.userHistoryFinder = userHistoryFinder;
    }

    @Override
    public StudentsForGroupExcelView findView(long groupId) {
        AcademicGroup group = entityManager.createQuery(SELECT_GROUP_QUERY, AcademicGroup.class)
                .setParameter(1, groupId)
                .getResultStream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "group with id %d was not found".formatted(groupId)));

        String jpql = """
                select user
                from User user
                left join user.applicationUser app_user
                left join app_user.userHistories user_hist
                left join user_hist.statistics stats
                where user.id in ?1
                """;

        List<User> usersInGroup = entityManager.createQuery(jpql, User.class)
                .setParameter(1, group.getStudentIds())
                .getResultList();

        return null;
//
//        String jpql = """
//                select history
//                from UserHistory history
//                left join fetch history.statistics
//                left join fetch history.applicationUser app_user
//                left join fetch app_user.user user
//                where user.id in ?1
//                """;
//
//        List<UserHistory> userHistories = entityManager.createQuery(jpql, UserHistory.class)
//                .setParameter(1, group.getStudentIds())
//                .getResultStream()
//                .toList();
//
    }

}
