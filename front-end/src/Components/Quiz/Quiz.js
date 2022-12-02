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
    <div className="bg-secondaryblue h-screen">
      <Navbar />
      {!isQuizOver ? (
        <>
          <section className="text-2xl flex flex-col border-4 bg-white border-primaryblue rounded-lg w-1/3 min-w-fit items-center mx-auto">
            {/* <div>{currentQuestion.questionName}</div> */}
            <div className="my-4">Question one </div>
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
                  setIsNextQuestionFocused(true);
                  console.log(isNextQuestionFocused);
                }}
                disabled={!selectedAnswer && true}
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
