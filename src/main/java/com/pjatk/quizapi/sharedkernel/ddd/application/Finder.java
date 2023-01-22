package com.pjatk.quizapi.sharedkernel.ddd.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Service
@Retention(RetentionPolicy.RUNTIME)
//@Component
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public @interface Finder {
}
