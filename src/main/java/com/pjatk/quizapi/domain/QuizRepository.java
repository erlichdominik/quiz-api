package com.pjatk.quizapi.domain;

import org.springframework.data.repository.Repository;

import java.util.List;

interface QuizRepository extends Repository<Quiz, Long> {

    void deleteById(long id);

    List<Quiz> findAll();

    void save(Quiz quiz);
}
