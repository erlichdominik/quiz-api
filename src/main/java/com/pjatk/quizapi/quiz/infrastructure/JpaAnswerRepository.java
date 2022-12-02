package com.pjatk.quizapi.quiz.infrastructure;

import com.pjatk.quizapi.quiz.domain.answer.Answer;
import com.pjatk.quizapi.quiz.domain.answer.AnswerRepository;
import org.springframework.data.jpa.repository.JpaRepository;

interface JpaAnswerRepository extends JpaRepository<Answer, Long>, AnswerRepository {
}
