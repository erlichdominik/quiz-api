package com.pjatk.quizapi.api.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public record RegisterNewUserRequest(@NotNull @NotEmpty String login,
                                     @NotNull @NotEmpty String firstAnswerRecovery,
                                     @NotNull @NotEmpty String secondAnswerRecovery,
                                     @NotNull @NotEmpty @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$", message = """
                                             Password must contain at least one digit [0-9].
                                             Password must contain at least one lowercase Latin character [a-z].
                                             Password must contain at least one uppercase Latin character [A-Z].
                                             Password must contain at least one special character like ! @ # & ( ).
                                             Password must contain a length of at least 8 characters and a maximum of 20 characters.""") String password) {
}
