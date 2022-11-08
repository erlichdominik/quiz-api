package com.pjatk.quizapi.domain;

import com.pjatk.quizapi.api.command.DeleteQuizCommand;

public class QuizFacade {
    private final QuizRepository quizRepository;

    public QuizFacade(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public void deleteQuiz(DeleteQuizCommand deleteQuizCommand) {
        quizRepository.deleteById(deleteQuizCommand.id());
    }
}
