package com.pjatk.quizapi.quiz.domain.quiz;

import javax.persistence.Embeddable;
import java.util.Objects;

@Embeddable
public class QuizId {
    private long value;

    public QuizId(long value) {
        this.value = value;
    }

    protected QuizId() {

    }

    public long getValue() {
        return value;
    }

    void setValue(long value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuizId quizId = (QuizId) o;
        return value == quizId.value;
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
