package com.pjatk.quizapi.quiz.infrastructure;

import com.pjatk.quizapi.quiz.domain.quiz.QuizRepository;
import com.pjatk.quizapi.quiz.domain.quiz.QuizUploader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class QuizConfiguration {
    private final QuizRepository quizRepository;

    QuizConfiguration(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @Bean
    QuizUploader quizUploader() {
        return new QuizUploader(quizRepository);
    }
}
