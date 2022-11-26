package com.pjatk.quizapi.quiz.domain.question;

public record QuestionId(long questionId) {
    public static QuestionId of(long questionId) {
        return new QuestionId(questionId);
    }
}
