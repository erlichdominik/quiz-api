package com.pjatk.quizapi.security;

public enum Roles {
    STUDENT("STUDENT"),
    TEACHER("TEACHER"),
    ADMIN("ADMIN");

    private String role;

    Roles(String role) {
        this.role = role;
    }

    public String getRoleName() {
        return role;
    }
}
