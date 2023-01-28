import React from "react";

import { useEffect } from "react";
import Navbar from "../ui/Navbar";

import useQuizContext from "../../hooks/useQuizContext";
import useLanguageContext from "../../hooks/useLanguageContext";

const percentageFormatter = (percentageValue) =>
  `${(percentageValue * 100).toFixed(2)}%`;

const Quiz = () => {
  const {
    quizState,
    loadInitialQuestions,
    loadNextQuestion,
    selectedAnswer,
    setSelectedAnswer,
    isQuizOver,
    finalScore,
    canQuizBeCompleted,
  } = useQuizContext();

  const { nameLib } = useLanguageContext();

  useEffect(() => {
    if (quizState === null) {
      loadInitialQuestions();
      setSelectedAnswer(null);
    }
  }, []);

  const nextQuestionClickedHandler = () => {
    loadNextQuestion(selectedAnswer);
  };

  return (
    <main className="bg-secondaryblue h-screen w-screen ">
      <section className="h-4/5 flex justify-center items-center mx-2">
        <Navbar />
        {!isQuizOver && quizState !== null && canQuizBeCompleted && (
          <section className="text-2xl flex flex-col border bg-white border-primaryblue rounded-lg w-3/5 min-w-fit items-center mx-auto drop-shadow-md">
            <div className="py-3 px-6">
              {quizState.currentQuestion.questionName}
            </div>
            <div className="flex flex-col space-y-5 w-full">
              {quizState.answers.map((answer) => (
                <div
                  className={`border rounded-lg border-darkcl text-lg px-4 py-2 mx-auto w-11/12 max-w-full hover:bg-secondaryblue hover:text-white transition`}
                  key={answer.answerId}
                  onClick={() => setSelectedAnswer(answer.answerId)}
                >
                  <input
                    className="w-5 h-5 mr-2 align-middle"
                    type="radio"
                    id={answer.answerId}
                    name="answer"
                    checked={
                      answer.answerId === selectedAnswer &&
                      selectedAnswer !== null
                    }
                  ></input>
                  <label className="align-middle" htmlFor={answer.answerId}>
                    {answer.answer}
                  </label>
                </div>
              ))}
              <button
                className={`w-full pb-1
                ${
                  selectedAnswer === undefined || selectedAnswer === null
                    ? `opacity-50 cursor-default`
                    : `rounded-b-md hover:bg-secondaryblue hover:text-white transition`
                }`}
                onClick={
                  selectedAnswer === undefined || selectedAnswer === null
                    ? () => {}
                    : nextQuestionClickedHandler
                }
                disabled={
                  selectedAnswer === "" || selectedAnswer === null
                    ? true
                    : false
                }
              >
                {nameLib.nextQuestion}
              </button>
            </div>
          </section>
        )}
        <>
          {isQuizOver === true && (
            <div className="bg-white border border-primaryblue rounded-lg shadow p-3">
              <h3 className="text-center text-3xl ">
                {nameLib.thankYouForCompleting}
              </h3>
              <p className="text-center text-xl ">
                {nameLib.yourScore}
                {finalScore.statisticDtos
                  .sort((a, b) => a.pathName.localeCompare(b.pathName))
                  .map((s) => (
                    <p className="text-base font-normal">
                      {s.pathName}: &nbsp;
                      {percentageFormatter(s.completedPercentage)}
                    </p>
                  ))}
              </p>
            </div>
          )}
        </>
        {canQuizBeCompleted === false && (
          <div>
            <div className="bg-white border border-primaryblue rounded-lg shadow p-3 w-1/2 mx-auto">
              <h3 className="block text-center text-3xl ">
                {nameLib.attemptsOver}
              </h3>
              <h3 className="block text-center text-2xl ">
                {nameLib.attemptsExplanation}
              </h3>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Quiz;
