package com.pjatk.quizapi.quiz.infrastructure;

import com.pjatk.quizapi.quiz.domain.pathway.Pathway;
import com.pjatk.quizapi.quiz.domain.pathway.PathwayRepository;
import org.springframework.data.jpa.repository.JpaRepository;

interface JpaPathwayRepository extends JpaRepository<Pathway, Long>, PathwayRepository {
}
