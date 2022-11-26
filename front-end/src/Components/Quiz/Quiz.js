import React from 'react';

import { useState, useEffect } from 'react';
import {
  getStartingQuestion,
  getNextQuestion,
} from '../../utils/mock-data/mock-quiz';
import useQuiz from '../../hooks/useQuiz';
import Navbar from '../ui/Navbar';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isNextQuestionFocused, setIsNextQuestionFocused] = useState(false);

  const { quizState, setQuizState } = useQuiz();

  useEffect(() => {
    const isQuizContextEmpty = Object?.keys(quizState)?.length === 0 ?? true;

    // emulate loading questions
    // this should be called when currently the quizState is empty (from context)
    let firstQuestion = isQuizContextEmpty
      ? getStartingQuestion() /* this will be an API call to initialize the quiz */
      : quizState.currentQuestion;

    setCurrentQuestion(() => ({
      ...firstQuestion,
    }));
    setAnswers(firstQuestion.answers);

    !isQuizContextEmpty && setSelectedAnswer(quizState.selectedAnswer);
  }, []);

  useEffect(() => {
    setQuizState((quizState) => ({
      ...quizState,
      currentQuestion: currentQuestion,
      answers: answers,
      selectedAnswer: selectedAnswer,
    }));
  }, [selectedAnswer]);

  const answerClickHandler = (answerId) => {
    setIsNextQuestionFocused(false);
    setSelectedAnswer(answerId);
  };

  const nextQuestionClickedHandler = () => {
    let nextQuestion = getNextQuestion(currentQuestion.id);

    setCurrentQuestion((currentQuestion) => ({
      ...currentQuestion,
      ...nextQuestion,
    }));

    setSelectedAnswer('');

    setAnswers(nextQuestion.answers);
  };

  return (
    <>
      <Navbar />
      <section className="text-2xl flex flex-col bg-blue-300 border-blue-500 border-2 w-1/3 items-center mx-auto">
        <div>{currentQuestion.questionName}</div>
        <div>
          {answers?.map((answer) => (
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
          className={`self-end  border-2 px-3 py-2 rounded-l bg-blue-500 ${
            !selectedAnswer && 'opacity-75'
          }`}
          onClick={nextQuestionClickedHandler}
          onMouseOver={() => {
            setIsNextQuestionFocused(true);
            console.log(isNextQuestionFocused);
          }}
          disabled={!selectedAnswer && true}
        >
          Next question
        </button>
        <div className="self-end border-red-500"></div>
      </section>
    </>
  );
};

export default Quiz;
