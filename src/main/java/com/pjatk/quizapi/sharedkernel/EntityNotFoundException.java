package com.pjatk.quizapi.sharedkernel;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(Class<?> clazz, long entityId) {
        super(String.format("%s with id %d was not found", clazz.getSimpleName(), entityId), null, false, true);
    }
}
