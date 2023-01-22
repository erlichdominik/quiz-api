package com.pjatk.quizapi.quiz.domain.walkthrough;

import com.pjatk.quizapi.sharedkernel.annotations.domain.DomainRepository;

import java.util.List;
import java.util.Optional;

@DomainRepository
public interface WalkthroughRepository {
    <S extends Walkthrough> S save(S entity);

    List<Walkthrough> findAll();

    Optional<Walkthrough> findById(long id);

    Walkthrough deleteById(long id);
}
