package com.pjatk.quizapi.api.dto;

import java.util.Objects;

public class QuizName {
    private final long id;
    private final String name;

    public QuizName(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public long getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuizName quizName = (QuizName) o;
        return id == quizName.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
