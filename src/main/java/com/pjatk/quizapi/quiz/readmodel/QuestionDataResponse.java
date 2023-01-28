package com.pjatk.quizapi.quiz.readmodel;

import java.util.List;

public record QuestionDataResponse(long walkthroughId, QuestionDto questionDto) {
    public record QuestionDto(long questionId, String question, List<AnswerDto> answerDtos) {
    }

    public record AnswerDto(long answerId, String answer) {
    }

}