package com.pjatk.quizapi.teacher.readmodel.impl;

import com.pjatk.quizapi.security.User;
import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;
import com.pjatk.quizapi.teacher.domain.group.AcademicGroup;
import com.pjatk.quizapi.teacher.readmodel.StudentsForGroup;
import com.pjatk.quizapi.teacher.readmodel.StudentsForGroupFinder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Finder
class JpaStudentsForGroupFinder implements StudentsForGroupFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public StudentsForGroup findAll(long groupId, long teacherId) {
        String sql = """
                SELECT a
                FROM AcademicGroup a
                WHERE id = ?1
                """;

        AcademicGroup group = entityManager.createQuery(sql, AcademicGroup.class)
                .setParameter(1, groupId)
                .getSingleResult();

        String selectAllStudentsQuery = """
                SELECT u
                FROM User u
                WHERE u.id IN ?1
                """;

        List<StudentsForGroup.Student> students = entityManager.createQuery(selectAllStudentsQuery, User.class)
                .setParameter(1, group.getStudentIds().stream().toList())
                .getResultStream()
                .map(this::map)
                .toList();

        return new StudentsForGroup(students);
    }

    private StudentsForGroup.Student map(User user) {
        return new StudentsForGroup.Student(user.getId(), user.getUsername());
    }
}
