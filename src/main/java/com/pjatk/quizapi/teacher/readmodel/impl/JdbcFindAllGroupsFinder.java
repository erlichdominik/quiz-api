package com.pjatk.quizapi.teacher.readmodel.impl;

import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;
import com.pjatk.quizapi.teacher.readmodel.FindAllGroupsFinder;
import com.pjatk.quizapi.teacher.readmodel.FindAllGroupsView;
import com.pjatk.quizapi.teacher.readmodel.FindAllGroupsView.Group;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Tuple;
import java.math.BigInteger;
import java.util.List;

@Finder
class JdbcFindAllGroupsFinder implements FindAllGroupsFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public FindAllGroupsView findAll(long teacherId) {
        var sql = """
                SELECT id, code, name
                FROM academic_group 
                WHERE teacher_id = ?1
                """;

        List<Tuple> resultList = entityManager.createNativeQuery(sql, Tuple.class)
                .setParameter(1, teacherId)
                .getResultList();

        List<Group> groups = resultList
                .stream()
                .map(this::mapToGroup)
                .toList();

        return new FindAllGroupsView(groups);
    }

    private Group mapToGroup(Tuple tuple) {
        BigInteger id = (BigInteger) tuple.get(0);
        String code = (String) tuple.get(1);
        String name = (String) tuple.get(2);

        return new Group(id.intValue(), code, name);
    }
}
