package com.pjatk.quizapi.security;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
class MailValidatorUnitTest {
    private MailValidator underTest = new MailValidator();
    @Test
    void requireCorrectMail() {
        assertThatThrownBy(() -> {
            underTest.requireCorrectMail("test", "@com.pl");
        }).hasMessageContaining("Wrong mail format!");
    }
}