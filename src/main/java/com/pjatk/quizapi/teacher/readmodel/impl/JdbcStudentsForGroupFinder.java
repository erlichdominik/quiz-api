package com.pjatk.quizapi.teacher.readmodel.impl;

import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;
import com.pjatk.quizapi.teacher.readmodel.StudentsForGroup;
import com.pjatk.quizapi.teacher.readmodel.StudentsForGroupFinder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Finder
class JdbcStudentsForGroupFinder implements StudentsForGroupFinder {
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public List<StudentsForGroup> findAll(long groupId, long teacherId) {
//        var sql = """
//                """;
//
//        entityManager.createNativeQuery(sql, Tuple.class)

        return null;
    }
}
