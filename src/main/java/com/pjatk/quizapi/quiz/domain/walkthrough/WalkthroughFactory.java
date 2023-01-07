package com.pjatk.quizapi.quiz.domain.walkthrough;

import com.pjatk.quizapi.quiz.domain.pathway.Pathway;
import com.pjatk.quizapi.quiz.domain.quiz.Quiz;
import com.pjatk.quizapi.quiz.domain.quiz.QuizId;

import java.util.List;
import java.util.Set;

public class WalkthroughFactory {
    public Walkthrough fromQuiz(Quiz quiz) {
        Set<Pathway> pathways = quiz.getPathways();

        List<QuestionsIndex> questionsIndices = new QuestionIndicesFactory()
                .fromPathways(pathways);

        return new Walkthrough(questionsIndices, new QuizId(quiz.getId()));
    }
}
