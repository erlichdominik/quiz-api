package com.pjatk.quizapi.quiz.infrastructure;

import com.pjatk.quizapi.quiz.domain.question.Question;
import com.pjatk.quizapi.quiz.domain.question.QuestionRepository;
import org.springframework.data.jpa.repository.JpaRepository;

interface JpaQuestionRepository extends JpaRepository<Question, Long>, QuestionRepository {
}
