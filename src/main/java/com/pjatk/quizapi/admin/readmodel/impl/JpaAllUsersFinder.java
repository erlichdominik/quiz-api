package com.pjatk.quizapi.admin.readmodel.impl;

import com.pjatk.quizapi.admin.readmodel.AllUsersFinder;
import com.pjatk.quizapi.admin.readmodel.User;
import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;
import com.pjatk.quizapi.admin.readmodel.AllUsers;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Finder
class JpaAllUsersFinder implements AllUsersFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public AllUsers findAllUsers() {
        var sql = """
                SELECT new com.pjatk.quizapi.admin.readmodel.User(u.id, r, u.email)
                FROM User u left join u.roles r
                """;

        List<User> users = entityManager.createQuery(sql, User.class)
                .getResultList();

        return new AllUsers(users);
    }
}
