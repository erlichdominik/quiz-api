package com.pjatk.quizapi.quiz.domain.appuser;

import com.pjatk.quizapi.ddd.annotations.domain.DomainRepository;

@DomainRepository
public interface ApplicationUserRepository {
    <S extends ApplicationUser> S save(S entity);
}
