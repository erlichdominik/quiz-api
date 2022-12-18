import React from 'react';

import { useEffect } from 'react';
import Navbar from '../ui/Navbar';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useCookieState from '../../hooks/useCookieState';
import localKeys from '../../utils/local-storage-keys/localStorageKeys';

const QUIZ_INIT_URL = '/quiz/init';
const QUIZ_SUBMIT_URL = '/quiz/submit';
const QUIZ_NEXT_QUESTION_URL = '/quiz/next';
const QUIZ_ID = 1;
const QUIZ_MODE = 'EXAM';

const Quiz = () => {
  const [quiz, setQuiz] = useCookieState({}, localKeys.QUIZ_KEY);

  const [selectedAnswer, setSelectedAnswer] = useCookieState(
    '',
    localKeys.QUIZ_ANSWER_KEY
  );

  const [isQuizOver, setIsQuizOver] = useCookieState(
    false,
    localKeys.IS_QUIZ_OVER_KEY
  );

  const { currentQuestion, answers, walkthroughId } = quiz;

  const axiosPrivate = useAxiosPrivate();

  const loadQuizData = async () => {
    try {
      await axiosPrivate.get(
        `${QUIZ_INIT_URL}?quizMode=${QUIZ_MODE}&quizId=${QUIZ_ID}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadNextQuestion = async () => {
    try {
      await axiosPrivate.get(
        `${QUIZ_NEXT_QUESTION_URL}?walkthroughId=${walkthroughId}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const submitQuestion = async () => {
    try {
      await axiosPrivate.post(
        `${QUIZ_SUBMIT_URL}?walkthroughId=${walkthroughId}&answerId=${selectedAnswer}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const nextQuestionClickedHandler = async () => {
    try {
      await submitQuestion();
      loadNextQuestion();
    } catch (err) {}
    setSelectedAnswer('');
  };

  return (
    <div className="bg-secondaryblue h-screen w-screen">
      <Navbar />
      {isQuizOver === false ? (
        <>
          <section className="text-2xl flex flex-col border-4 bg-white border-primaryblue rounded-lg w-1/3 min-w-fit items-center mx-auto">
            <div>{currentQuestion.questionName}</div>
            <div className="flex flex-col space-y-5 w-full">
              {answers?.map((answer) => (
                <div
                  className={`border-2 rounded-lg border-darkcl px-4 py-2 mx-auto w-10/12 hover:bg-secondaryblue hover:text-white transition
                  ${answer.answerId === selectedAnswer ? '' : ''} `}
                  key={answer.answerId}
                  onClick={() => setSelectedAnswer(selectedAnswer)}
                >
                  <input
                    className="w-5 h-5 mr-2"
                    type="radio"
                    id={answer.answerId}
                    name="answer"
                    value={answer.answer}
                    checked={answer.answerId === selectedAnswer}
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
                onMouseOver={() => {
                  console.log('is quiz over?', isQuizOver);
                }}
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
      )}
    </div>
  );
};

export default Quiz;
