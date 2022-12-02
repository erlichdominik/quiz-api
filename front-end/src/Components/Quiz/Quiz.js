import React from 'react';

import { useState, useEffect } from 'react';
import useQuiz from '../../hooks/useQuiz';
import Navbar from '../ui/Navbar';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const QUIZ_INIT_URL = '/quiz/init';
const QUIZ_SUBMIT_URL = '/quiz/submit';
const QUIZ_NEXT_QUESTION_URL = '/quiz/next';
const QUIZ_ID = 1;
const QUIZ_MODE = 'EXAM';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isNextQuestionFocused, setIsNextQuestionFocused] = useState(false);
  const [walkthroughId, setWalkthroughId] = useState();
  const [isQuizOver, setIsQuizOver] = useState(false);

  const { quizState, setQuizState } = useQuiz();
  const { auth } = useAuth();

  const setQuizContextState = () => {
    setQuizState((quizState) => ({
      ...quizState,
      walkthroughId: walkthroughId,
      currentQuestion: currentQuestion,
      answers: answers,
      selectedAnswer: selectedAnswer,
    }));
  };

  const mapResponseToCurrentState = (responseData) => {
    const { walkthroughId, questionDto } = responseData;
    setWalkthroughId(walkthroughId);
    setCurrentQuestion(() => ({
      questionName: questionDto.question,
      questionId: questionDto.questionId,
    }));
    setAnswers(questionDto.answerDtos);
  };

  const quizData = async () => {
    try {
      await axios
        .get(`${QUIZ_INIT_URL}?quizMode=${QUIZ_MODE}&quizId=${QUIZ_ID}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((resp) => {
          mapResponseToCurrentState(resp.data);
        });

      setQuizContextState();
    } catch (err) {
      console.log(err);
    }
  };

  const loadNextQuestion = async () => {
    try {
      await axios
        .get(`${QUIZ_NEXT_QUESTION_URL}?walkthroughId=${walkthroughId}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((resp) => {
          mapResponseToCurrentState(resp.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const submitQuestion = async () => {
    console.log('walkthroughid: ', walkthroughId);
    console.log('selected answer: ', walkthroughId);
    try {
      await axios
        .post(
          `${QUIZ_SUBMIT_URL}?walkthroughId=${walkthroughId}&answerId=${selectedAnswer}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((resp) => {
          console.log(resp.data.isQuizOver);

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
    setIsNextQuestionFocused(false);
    setSelectedAnswer(answerId);
  };

  const nextQuestionClickedHandler = () => {
    submitQuestion()
      .then(() => loadNextQuestion())
      .catch(() => {
        console.log('wyjebalo sie');
      });
  };

  return (
    <>
      <Navbar />
      {!isQuizOver ? (
        <>
          <section className="text-2xl flex flex-col bg-blue-300 border-blue-500 border-2 w-1/3 items-center mx-auto">
            <div>{currentQuestion.questionName}</div>
            <div>
              {answers?.map((answer) => (
                <div
                  className={
                    answer.answerId === selectedAnswer
                      ? 'border-blue-700 border-2'
                      : ''
                  }
                  key={answer.answerId}
                  onClick={() => {
                    answerClickHandler(answer.answerId);
                  }}
                >
                  {answer.answer}
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
      ) : (
        <>
          <h3 className="text-center text-3xl text-red-500">
            Thank you for completing the quiz!
          </h3>
        </>
      )}
    </>
  );
};

export default Quiz;
