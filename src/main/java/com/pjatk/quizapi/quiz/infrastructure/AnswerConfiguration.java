package com.pjatk.quizapi.quiz.infrastructure;

import com.pjatk.quizapi.quiz.domain.answer.AnswerRepository;
import com.pjatk.quizapi.quiz.domain.answer.AnswerValidator;
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
