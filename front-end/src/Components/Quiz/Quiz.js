import React from 'react';

import { useState, useEffect } from 'react';
import useQuiz from '../../hooks/useQuiz';
import Navbar from '../ui/Navbar';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const QUIZ_INIT_URL = '/quiz/init';
const QUIZ_SUBMIT_URL = '/quiz/submit';
const QUIZ_NEXT_QUESTION_URL = '/quiz/next';
const QUIZ_ID = 1;
const QUIZ_MODE = 'EXAM';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [walkthroughId, setWalkthroughId] = useState();

  const { quizState, setQuizState, isQuizOver, setIsQuizOver } = useQuiz();

  const axiosPrivate = useAxiosPrivate();

  const setQuizContextState = () => {
    console.log('setting context state, props:');
    console.log(walkthroughId);
    console.log(currentQuestion);
    console.log(answers);
    console.log(selectedAnswer);
    setQuizState((quizState) => ({
      ...quizState,
      walkthroughId: walkthroughId,
      currentQuestion: currentQuestion,
      answers: answers,
      selectedAnswer: selectedAnswer,
    }));
    console.log('quiz state', quizState);
  };

  const setQuizContextStateFromObj = (quizObj) => {
    console.log('setting context state from obj, props:');
    console.log(quizObj.walkthroughId);
    console.log(quizObj.currentQuestion);
    console.log(quizObj.answers);
    console.log(quizObj.selectedAnswer);
    setQuizState((quizState) => ({
      ...quizState,
      walkthroughId: quizObj.walkthroughId,
      currentQuestion: quizObj.currentQuestion,
      answers: quizObj.answers,
      selectedAnswer: quizObj.selectedAnswer,
    }));
    console.log('quiz state', quizState);
  };

  const mapResponseToCurrentState = (responseData) => {
    console.log('response data: ', responseData);
    const { walkthroughId, questionDto } = responseData;
    setWalkthroughId(walkthroughId);
    setCurrentQuestion(() => ({
      questionName: questionDto.question,
      questionId: questionDto.questionId,
    }));
    setAnswers(questionDto.answerDtos);
  };

  const getQuizStateFromResponseData = (responseData) => {
    return {
      walkthroughId: responseData.walkthroughId,
      currentQuestion: {
        questionId: responseData.questionDto.questionId,
        questionName: responseData.questionDto.question,
      },
      answers: responseData.questionDto.answerDtos,
    };
  };

  const quizData = async () => {
    try {
      await axiosPrivate
        .get(`${QUIZ_INIT_URL}?quizMode=${QUIZ_MODE}&quizId=${QUIZ_ID}`)
        .then((resp) => {
          mapResponseToCurrentState(resp.data);
          const qState = getQuizStateFromResponseData(resp.data);
          setQuizContextStateFromObj(qState);
          setIsQuizOver(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const loadNextQuestion = async () => {
    try {
      await axiosPrivate
        .get(`${QUIZ_NEXT_QUESTION_URL}?walkthroughId=${walkthroughId}`)
        .then((resp) => {
          mapResponseToCurrentState(resp.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const submitQuestion = async () => {
    try {
      await axiosPrivate
        .post(
          `${QUIZ_SUBMIT_URL}?walkthroughId=${walkthroughId}&answerId=${selectedAnswer}`
        )
        .then((resp) => {
          setIsQuizOver(resp.data.isQuizOver);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const isQuizContextEmpty = Object?.keys(quizState)?.length === 0 ?? true;

    if (isQuizContextEmpty) {
      quizData().catch(console.error);
    } else {
      setWalkthroughId(quizState.walkthroughId);
      setCurrentQuestion(() => ({
        ...quizState.currentQuestion,
      }));
      setAnswers(quizState.answers);
      setSelectedAnswer(quizState.selectedAnswer);
    }
  }, []);

  useEffect(() => {
    setQuizContextState();
  }, [selectedAnswer]);

  const answerClickHandler = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const nextQuestionClickedHandler = () => {
    submitQuestion()
      .then(() => loadNextQuestion())
      .catch(() => {
        console.log('wyjebalo sie');
      });

    setSelectedAnswer('');
  };

  return (
    <div className="bg-secondaryblue h-screen">
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
                  onClick={() => {
                    answerClickHandler(answer.answerId);
                  }}
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
