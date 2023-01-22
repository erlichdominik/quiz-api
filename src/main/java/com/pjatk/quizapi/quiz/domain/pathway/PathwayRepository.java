package com.pjatk.quizapi.quiz.domain.pathway;

import com.pjatk.quizapi.sharedkernel.ddd.domain.DomainRepository;
import com.pjatk.quizapi.quiz.domain.quiz.Quiz;

import java.util.List;
import java.util.Optional;

@DomainRepository
public interface PathwayRepository {
    Optional<Pathway> findById(long id);

    List<Pathway> findAll();

    List<Pathway> findAllByQuiz(Quiz quiz);

}
