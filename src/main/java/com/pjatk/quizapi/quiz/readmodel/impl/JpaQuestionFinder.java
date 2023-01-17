package com.pjatk.quizapi.quiz.readmodel.impl;

import com.pjatk.quizapi.ddd.annotations.application.Finder;
import com.pjatk.quizapi.quiz.application.commands.QuizAlreadyFinishedException;
import com.pjatk.quizapi.quiz.domain.answer.Answer;
import com.pjatk.quizapi.quiz.domain.question.Question;
import com.pjatk.quizapi.quiz.domain.question.QuestionId;
import com.pjatk.quizapi.quiz.domain.walkthrough.Walkthrough;
import com.pjatk.quizapi.quiz.readmodel.QuestionDataRequest;
import com.pjatk.quizapi.quiz.readmodel.QuestionDataResponse;
import com.pjatk.quizapi.quiz.readmodel.QuestionDataResponse.AnswerDto;
import com.pjatk.quizapi.quiz.readmodel.QuestionDataResponse.QuestionDto;
import com.pjatk.quizapi.quiz.readmodel.QuestionFinder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.stream.Collectors;

@Finder
class JpaQuestionFinder implements QuestionFinder {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public QuestionDataResponse find(QuestionDataRequest request) {
        String jpql = "select w from Walkthrough w where w.id = ?1";
        TypedQuery<Walkthrough> query = entityManager.createQuery(jpql, Walkthrough.class).setParameter(1, request.walkthroughId());

        Walkthrough walkThrough = query.getResultStream()
                .findFirst()
                .orElseThrow(GameNotInitialized::new);

        if (walkThrough.isWalkthroughOver()) throw new QuizAlreadyFinishedException();

        QuestionId questionId = walkThrough.getCurrentQuestionId();

        String findQuestionByIdJpql = "select q from Question q left join fetch q.answers where q.id = ?1";

        TypedQuery<Question> currentQuestionQuestion = entityManager.createQuery(findQuestionByIdJpql, Question.class)
                .setParameter(1, questionId.questionId());

        Question question = currentQuestionQuestion.getSingleResult();


        return new QuestionDataResponse(walkThrough.getId(), map(question));
    }


    private QuestionDto map(Question question) {
       return new QuestionDto(question.getId(), question.getText(), question.getAnswers()
               .stream().map(this::map).collect(Collectors.toSet()));
    }

    private AnswerDto map(Answer answer) {
        return new AnswerDto(answer.getId(), answer.getText());
    }


}
