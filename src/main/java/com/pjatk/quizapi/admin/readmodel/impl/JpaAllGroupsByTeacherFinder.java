package com.pjatk.quizapi.admin.readmodel.impl;

import com.pjatk.quizapi.admin.readmodel.AllGroupsByTeacher;
import com.pjatk.quizapi.admin.readmodel.AllGroupsByTeacherFinder;
import com.pjatk.quizapi.admin.readmodel.Group;
import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Finder
class JpaAllGroupsByTeacherFinder implements AllGroupsByTeacherFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public AllGroupsByTeacher findAll() {
        var jpql = """
                select new com.pjatk.quizapi.admin.readmodel.Group(a.id, a.name, a.code, u.email)
                from AcademicGroup a
                left join User u
                on a.teacherId = u.id
                """;

        return new AllGroupsByTeacher(entityManager.createQuery(jpql, Group.class)
                .getResultList());
    }
}
