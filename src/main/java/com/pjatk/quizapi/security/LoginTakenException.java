package com.pjatk.quizapi.security;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class LoginTakenException extends RuntimeException {
    public LoginTakenException() {
        super("Login already taken", null, false, true);
    }
}
