package com.pjatk.quizapi.quiz.domain.question;

import java.util.Optional;

public interface QuestionRepository {
    Optional<Question> findById(long id);
}
