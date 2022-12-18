import React from 'react';

import { useState, useEffect } from 'react';
import Navbar from '../ui/Navbar';
import useQuiz from '../../hooks/useQuiz';

import QUIZ_OPTIONS from '../../utils/options/quizOptions';
import useCookieState from '../../hooks/useCookieState';
import localKeys from '../../utils/local-storage-keys/localStorageKeys';

const Quiz = () => {
  const [quizState, isQuizOver, loadInitialQuestions, loadNextQuestion] =
    useQuiz(QUIZ_OPTIONS);

  const isQuizStateEmpty =
    quizState &&
    Object.keys(quizState).length === 0 &&
    Object.getPrototypeOf(quizState) === Object.prototype;

  const [selectedAnswer, setSelectedAnswer] = useCookieState(
    '',
    localKeys.QUIZ_ANSWER_KEY
  );

  const [isQuizStarted, setIsQuizStarted] = useCookieState(
    true,
    localKeys.IS_QUIZ_STARTED_KEY
  );

  useEffect(() => {
    loadInitialQuestions();
    console.log('is quiz started?', isQuizStarted);
    console.log('is quiz over?', isQuizOver);
    console.log('is quiz state not empty?', !isQuizStateEmpty);
  }, []);

  const answerSelectedHandler = (e) => {
    console.log('clickedAnswer: ', e.target.value);
    console.log('answers: ', quizState.answers);
    setSelectedAnswer(e.target.value);
  };

  const nextQuestionClickedHandler = () => {
    loadNextQuestion(selectedAnswer);
  };

  return (
    <div className="bg-secondaryblue h-screen w-screen">
      {/* <Navbar />
      {isQuizOver === false ? (
        <>
          <section className="text-2xl flex flex-col border-4 bg-white border-primaryblue rounded-lg w-1/3 min-w-fit items-center mx-auto">
            <div>{quizState.currentQuestion.questionName}</div>
            <div className="flex flex-col space-y-5 w-full">
              {quizState.answers.map((answer) => (
                <div
                  className={`border-2 rounded-lg border-darkcl px-4 py-2 mx-auto w-10/12 hover:bg-secondaryblue hover:text-white transition
                  ${answer.answerId === selectedAnswer ? '' : ''} `}
                  key={answer.answerId}
                  onClick={(e) => answerSelectedHandler(e)}
                >
                  <input
                    className="w-5 h-5 mr-2"
                    type="radio"
                    id={answer.answerId}
                    name="answer"
                    value={answer.answerId}
                  ></input>
                  <label className="" htmlFor={answer.answerId}>
                    {answer.answer}
                  </label>
                </div>
              ))}

              <button
                className={`w-full 
                ${
                  selectedAnswer
                    ? `rounded hover:bg-secondaryblue hover:text-white transition`
                    : `opacity-75`
                }`}
                onClick={nextQuestionClickedHandler}
                disabled={selectedAnswer === '' ? true : false}
              >
                Next question
              </button>
            </div>
          </section>
        </>
      ) : (
        <>
          <h3 className="text-center text-3xl ">
            Thank you for completing the quiz!
          </h3>
        </>
      )} */}
    </div>
  );
};

export default Quiz;
