package com.pjatk.quizapi.quiz.domain.walkthrough;

import com.pjatk.quizapi.quiz.domain.appuser.ApplicationUser;
import com.pjatk.quizapi.quiz.domain.question.QuestionId;
import com.pjatk.quizapi.quiz.domain.quiz.QuizId;
import com.pjatk.quizapi.sharedkernel.AbstractEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity
public class Walkthrough extends AbstractEntity {
    public enum State {
        INIT, IN_GAME, FINISHED
    }

    protected Walkthrough() {
    }

    @OneToMany(cascade = CascadeType.ALL)
    @OrderColumn(name = "walkthrough_index", nullable = false)
    private List<QuestionsIndex> questionsIndices = new ArrayList<>();

    private int currentIndex = 0;
    private int currentQuestionIndex = 0;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Stat> stats = new HashSet<>();

    @Getter
    @Enumerated(value = EnumType.STRING)
    private State state;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "quiz_id"))
    @Getter
    private QuizId quizId;

    @OneToOne
    @Setter
    @JoinColumn(name = "user_id")
    @Getter
    private ApplicationUser appUser;

    public Walkthrough(List<QuestionsIndex> questionsIndices, QuizId quizId) {
        state = State.INIT;
        this.questionsIndices = new ArrayList<>(questionsIndices);
        this.quizId = quizId;
    }

    void createNewStatistic(boolean isAnswerCorrect) {
        var statistic = new Stat(getCurrentQuestionId().questionId(), isAnswerCorrect, this);
        stats.add(statistic);
    }

    public QuestionId getCurrentQuestionId() {
        return QuestionId.of(questionsIndices.get(currentIndex).getQuestionsId().get(currentQuestionIndex));
    }

    public boolean isWalkthroughOver() {
        return state == State.FINISHED;
    }

    public boolean hasNext(boolean isAnswerCorrect) {
        if (isAnswerCorrect) {
            return hasNextQuestion();
        } else {
            return hasNextQuestionSet();
        }
    }

    public void next(boolean isAnswerCorrect) {
        if (isAnswerCorrect) {
            nextQuestion(isAnswerCorrect);
        } else {
            nextQuestionSet(isAnswerCorrect);
        }
    }

    private boolean hasNextQuestion() {
        state = State.IN_GAME;
        boolean doesNextQuestionNotExists = questionsIndices.get(currentIndex).getQuestionsId().size() <= currentQuestionIndex + 1;

        if (doesNextQuestionNotExists) {
            boolean nextQuestionsExists = questionsIndices.size() >= currentIndex + 2;

            QuestionsIndex nextQuestions;
            if (nextQuestionsExists) {
                nextQuestions = questionsIndices.get(currentIndex + 1);
            } else {
                state = State.FINISHED;
                return false;
            }
            return !nextQuestions.getQuestionsId().isEmpty();
        } else {
            return true;
        }

    }

    private void nextQuestion(boolean isAnswerCorrect) {
        boolean hasNext = hasNextQuestion();

        if (hasNext) {
            state = State.IN_GAME;
            if (doesNextQuestionInCurrentQuestionsExists()) {
                createNewStatistic(isAnswerCorrect);
                currentQuestionIndex++;
            } else {
                if (doesNextQuestionsExists()) {
                    createNewStatistic(isAnswerCorrect);
                    ++currentIndex;
                    currentQuestionIndex = 0;
                } else {
                    state = State.FINISHED;
                    throw new NoSuchElementException();
                }
            }
        } else {
            throw new NoSuchElementException();
        }
    }

    private boolean hasNextQuestionSet() {
        boolean hasNext = questionsIndices.size() > currentIndex + 1;
        if (!hasNext) {
            state = State.FINISHED;
        }
        return hasNext;
    }

    private void nextQuestionSet(boolean isAnswerCorrect) {
        if (!hasNextQuestionSet()) {
            throw new NoSuchElementException();
        }
        createNewStatistic(isAnswerCorrect);
        currentIndex++;
        currentQuestionIndex = 0;
        QuestionId.of(questionsIndices.get(currentIndex).getQuestionsId().get(currentQuestionIndex));
    }

    private boolean doesNextQuestionsExists() {
        return questionsIndices.size() >= currentIndex - 1;
    }

    private boolean doesNextQuestionInCurrentQuestionsExists() {
        return questionsIndices.get(currentIndex).getQuestionsId().size() > currentQuestionIndex + 1;
    }

}
