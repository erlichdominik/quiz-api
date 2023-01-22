package com.pjatk.quizapi.quiz.domain.walkthrough;

import com.pjatk.quizapi.sharedkernel.ddd.domain.DomainRepository;

import java.util.Optional;

@DomainRepository
public interface WalkthroughRepository {
    <S extends Walkthrough> S save(S entity);

    Optional<Walkthrough> findById(long id);

    Walkthrough deleteById(long id);
}
