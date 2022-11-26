package com.pjatk.quizapi.quiz.infrastructure;

import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.quiz.domain.walkthrough.WalkthroughRepository;
import org.springframework.data.jpa.repository.JpaRepository;

interface JpaWalkthroughRepository extends JpaRepository<Walkthrough, Long>, WalkthroughRepository {
}
