package com.pjatk.quizapi.domain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class AnswerConfiguration {
    private final AnswerRepository answerRepository;


    AnswerConfiguration(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    @Bean
    AnswerValidator answerValidator() {
        return new AnswerValidator(answerRepository);
    }
}
