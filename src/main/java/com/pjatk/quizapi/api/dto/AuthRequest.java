package com.pjatk.quizapi.api.dto;

import javax.validation.constraints.NotNull;

public record AuthRequest(@NotNull String email, @NotNull String password) {
}
