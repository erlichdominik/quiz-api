package com.pjatk.quizapi.quiz.domain.quiz;

import com.pjatk.quizapi.ddd.annotations.domain.DomainRepository;

import java.util.List;
import java.util.Optional;

@DomainRepository
public interface QuizRepository {

    void deleteById(long id);

    List<Quiz> findAll();

    <S extends Quiz> S save(S quiz);

    Optional<Quiz> findById(long id);

}
