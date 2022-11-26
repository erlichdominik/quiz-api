package com.pjatk.quizapi.quiz.domain.question;

public class CorrectAnswerInQuestionNotFoundException extends RuntimeException {
    public CorrectAnswerInQuestionNotFoundException(long id) {
       super(String.format("Question with id %d does not have any correct questions", id), null, false, true);
    }

}
