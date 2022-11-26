package com.pjatk.quizapi.quiz.domain.quiz;

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
