package com.pjatk.quizapi.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

@org.springframework.web.bind.annotation.ControllerAdvice
class ControllerAdvice {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<Error> handleException(MethodArgumentNotValidException e) {
        String ex = e.getBindingResult().getFieldError().getDefaultMessage();

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                .body(new Error(405, "data not valid", ex));
    }

    record Error(int status, String error, String message) {}
}

