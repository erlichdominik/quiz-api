package com.pjatk.quizapi.domain;

import com.pjatk.quizapi.api.dto.QuestionNotFoundException;

import java.util.UUID;

public class AnswerValidator {
    private final AnswerRepository answerRepository;

    AnswerValidator(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public boolean validate(UUID answerId) {
        return answerRepository.findById(answerId).orElseThrow(QuestionNotFoundException::new).isTrue();
    }
}
