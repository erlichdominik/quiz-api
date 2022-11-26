package com.pjatk.quizapi.quiz.readmodel;

import java.util.Set;

public record QuestionDataResponse(long walkthroughId, QuestionDto questionDto) {
    public record QuestionDto(long questionId, String question, Set<AnswerDto> answerDtos) {
    }

    public record AnswerDto(long answerId, String answer) {
    }

}