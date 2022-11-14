import React from 'react';

import { useState, useEffect } from 'react';
import {
  getStartingQuestion,
  getNextQuestion,
} from '../../Utils/Mock-data/mock-quiz';
import useQuiz from '../../hooks/useQuiz';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isNextQuestionFocused, setIsNextQuestionFocused] = useState(false);

  const { quizState, setQuizState } = useQuiz();

  useEffect(() => {
    // emulate loading questions
    // this should be called when currently the quizState is empty (from context)
    let firstQuestion = getStartingQuestion();

    console.log(firstQuestion);

    setCurrentQuestion(() => ({
      ...firstQuestion,
    }));

    setAnswers(firstQuestion.answers);

    console.log('current question:');
    console.log(currentQuestion.answers);
  }, []);

  const loadQuestionsFromContext = () => {
    if (!quizState) {
      return;
    }
  };

  useEffect(() => {
    setQuizState((quizState) => ({
      ...quizState,
      currentQuestion: currentQuestion,
      answers: answers,
      selectedAnswer: selectedAnswer,
    }));
  }, [currentQuestion, answers, selectedAnswer]);

  const answerClickHandler = (answerId) => {
    setSelectedAnswer(answerId);
    console.log('Current selected answer: ');
    console.log(selectedAnswer);
  };

  const nextQuestionClickedHandler = () => {
    let nextQuestion = getNextQuestion(currentQuestion.id);

    setCurrentQuestion((currentQuestion) => ({
      ...currentQuestion,
      ...nextQuestion,
    }));

    setAnswers(nextQuestion.answers);
  };

  return (
    <section className="text-2xl flex flex-col bg-blue-300 border-blue-500 border-2 w-1/3 items-center mx-auto">
      <div>{currentQuestion.questionName}</div>
      <div>
        {answers.map((answer) => (
          <div
            className={
              answer.id === selectedAnswer ? 'border-blue-700 border-2' : ''
            }
            key={answer.id}
            onClick={() => {
              answerClickHandler(answer.id);
            }}
          >
            {answer.answerText}
          </div>
        ))}
      </div>
      <button
        className={`self-end  border-2 px-3 py-2 rounded-l ${
          isNextQuestionFocused && selectedAnswer
            ? 'bg-gray-500 border-white'
            : 'bg-blue-500 border-blue-700'
        }`}
        onClick={nextQuestionClickedHandler}
        onMouseOver={() => {
          setIsNextQuestionFocused(true);
        }}
        onBlur={() => {
          setIsNextQuestionFocused(false);
        }}
      >
        Next question
      </button>
      <div className="self-end border-red-500"></div>
    </section>
  );
};

export default Quiz;
