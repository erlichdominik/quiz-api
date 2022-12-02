package com.pjatk.quizapi.quiz.readmodel;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserStateDto(boolean isUserInGame, long walkthroughId) {
}
