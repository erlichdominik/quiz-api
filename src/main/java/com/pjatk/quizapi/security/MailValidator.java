package com.pjatk.quizapi.security;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

class MailValidator {
    MailValidator() {
    }

    void requireCorrectMail(String username, String suffix) {
        if (!username.endsWith(suffix)) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
                    "Wrong mail format!");
        }
    }
}