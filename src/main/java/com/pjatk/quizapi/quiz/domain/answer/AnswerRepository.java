package com.pjatk.quizapi.quiz.domain.answer;

import com.pjatk.quizapi.sharedkernel.ddd.domain.DomainRepository;

import java.util.Optional;

@DomainRepository
public interface AnswerRepository {
    Optional<Answer> findById(long id);
}
