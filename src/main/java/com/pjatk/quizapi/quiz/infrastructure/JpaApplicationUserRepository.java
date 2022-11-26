package com.pjatk.quizapi.quiz.infrastructure;

import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUserRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaApplicationUserRepository extends JpaRepository<ApplicationUser, Long>, ApplicationUserRepository {
}
