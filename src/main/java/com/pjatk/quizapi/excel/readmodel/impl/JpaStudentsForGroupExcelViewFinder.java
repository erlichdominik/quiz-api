package com.pjatk.quizapi.excel.readmodel.impl;

import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelFinder;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView.Student;
import com.pjatk.quizapi.excel.readmodel.StudentsForGroupExcelView.UserHistory;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import com.pjatk.quizapi.quiz.readmodel.UserHistoryFinder;
import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;
import com.pjatk.quizapi.teacher.domain.group.AcademicGroup;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
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
                select distinct (user)
                from User user
                left join fetch user.applicationUser app_user
                left join fetch app_user.userHistories user_hist
                left join fetch user_hist.statistics stats
                where user.id in ?1
                and user_hist.walkthroughDate >= ?2
                and user_hist.wasInExam = true
                """;

        List<User> usersInGroup = entityManager.createQuery(jpql, User.class)
                .setParameter(1, group.getStudentIds())
                .setParameter(2, group.getCreationDate())
                .getResultList();

        List<Student> students = usersInGroup.stream()
                .map(user -> {
                    String username = user.getEmail();

                    List<UserHistory> userHistoriesForAppUser = user.getApplicationUser()
                            .map(ApplicationUser::getUserHistories)
                            .map(userHistories -> userHistories.stream()
                                    .map(userHistory -> new UserHistory(userHistory.getWalkthroughDate(),
                                            userHistory.getStatistics().stream().map(statistic -> new StudentsForGroupExcelView.Statistic(statistic.getPathName(), statistic.getCompletedPercentage())).toList()))
                                    .toList()).orElse(new ArrayList<>());

                    return new Student(username, userHistoriesForAppUser);
                }).toList();

        StudentsForGroupExcelView.Group groupView = new StudentsForGroupExcelView.Group(group.getName(), group.getDeadline(), group.getCreationDate(), students);
        return new StudentsForGroupExcelView(groupView);
    }

}
