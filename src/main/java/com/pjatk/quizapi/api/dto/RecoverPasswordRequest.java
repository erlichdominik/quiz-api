package com.pjatk.quizapi.api.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public record RecoverPasswordRequest(@NotNull @NotEmpty String login,
                                     @NotNull @NotEmpty String firstAnswerRecovery,
                                     @NotNull @NotEmpty String secondAnswerRecovery,
                                     @NotNull @NotEmpty String newPassword) {
}
