package com.pjatk.quizapi.quiz.domain.answer;

import com.pjatk.quizapi.sharedkernel.annotations.domain.DomainRepository;

import java.util.Optional;

@DomainRepository
public interface AnswerRepository {
    Optional<Answer> findById(long id);
}
