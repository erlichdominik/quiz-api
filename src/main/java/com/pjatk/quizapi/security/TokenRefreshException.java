package com.pjatk.quizapi.security;

public class TokenRefreshException extends RuntimeException{
    public TokenRefreshException(String token, String s) {
        super(String.format("Failed for [%s]: %s", token, s));
    }
}
