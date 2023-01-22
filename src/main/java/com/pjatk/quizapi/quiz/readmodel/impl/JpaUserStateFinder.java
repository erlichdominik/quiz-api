package com.pjatk.quizapi.quiz.readmodel.impl;

import com.pjatk.quizapi.sharedkernel.ddd.application.Finder;
import com.pjatk.quizapi.quiz.readmodel.UserStateDto;
import com.pjatk.quizapi.quiz.readmodel.UserStateFinder;
import org.apache.commons.lang3.NotImplementedException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Finder
class JpaUserStateFinder implements UserStateFinder {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public UserStateDto find() {
//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // TODO: 02/12/2022 create
        throw new NotImplementedException();
    }
}
