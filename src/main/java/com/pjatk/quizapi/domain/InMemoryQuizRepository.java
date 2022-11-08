package com.pjatk.quizapi.domain;

import java.util.HashMap;
import java.util.List;
import java.util.function.Function;

class InMemoryQuizRepository implements QuizRepository {
    private final Function<Quiz, Long> idGetter;
    private final HashMap<Long, Quiz> db = new HashMap<>();

    InMemoryQuizRepository(Function<Quiz, Long> idGetter) {
        this.idGetter = idGetter;
    }

    @Override
    public void deleteById(long id) {
        db.remove(id);
    }

    @Override
    public List<Quiz> findAll() {
        return db.values().stream().toList();
    }

    @Override
    public void save(Quiz quiz) {
        db.put(idGetter.apply(quiz), quiz);
    }
}
