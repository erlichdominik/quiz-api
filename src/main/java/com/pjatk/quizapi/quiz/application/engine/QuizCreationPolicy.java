package com.pjatk.quizapi.quiz.application.engine;

import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;

public interface QuizCreationPolicy {
    Walkthrough createWalkthrough(ApplicationUser user, long quizId);
}
