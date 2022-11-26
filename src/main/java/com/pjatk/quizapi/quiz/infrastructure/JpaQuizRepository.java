package com.pjatk.quizapi.quiz.infrastructure;

import com.pjatk.quizapi.quiz.domain.quiz.Quiz;
import com.pjatk.quizapi.quiz.domain.quiz.QuizRepository;
import org.springframework.data.jpa.repository.JpaRepository;

interface JpaQuizRepository extends JpaRepository<Quiz, Long>, QuizRepository {
}

