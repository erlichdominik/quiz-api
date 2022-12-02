package com.pjatk.quizapi.quiz.domain.appuser;

import com.pjatk.quizapi.ddd.annotations.domain.DomainRepository;

import java.util.Optional;

@DomainRepository
public interface ApplicationUserRepository {
    <S extends ApplicationUser> S save(S entity);

    Optional<ApplicationUser> findByUserId(long userId);
}
