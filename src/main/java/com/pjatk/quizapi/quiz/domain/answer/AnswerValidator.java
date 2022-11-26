package com.pjatk.quizapi.quiz.domain.answer;

import com.pjatk.quizapi.api.dto.QuestionNotFoundException;

public class AnswerValidator {
    private final AnswerRepository answerRepository;

    AnswerValidator(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public boolean validate(long answerId) {
        return answerRepository.findById(answerId).orElseThrow(QuestionNotFoundException::new).isTrue();
    }
}
