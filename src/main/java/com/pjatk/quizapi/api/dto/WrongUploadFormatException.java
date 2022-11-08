package com.pjatk.quizapi.api.dto;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class WrongUploadFormatException extends RuntimeException {
    public WrongUploadFormatException() {
    }

    public WrongUploadFormatException(String message) {
        super(message);
    }

    public WrongUploadFormatException(String message, Throwable cause) {
        super(message, cause);
    }

    public WrongUploadFormatException(Throwable cause) {
        super(cause);
    }

    public WrongUploadFormatException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
