import React from "react";

import { useEffect } from "react";
import Navbar from "../ui/Navbar";

import useQuizContext from "../../hooks/useQuizContext";

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
  } = useQuizContext();

  console.log("final score => ", finalScore);

  useEffect(() => {
    if (quizState === null) {
      loadInitialQuestions();
      setSelectedAnswer(null);
    }
  }, []);

  const nextQuestionClickedHandler = () => {
    console.log("is quiz over => ", isQuizOver);
    loadNextQuestion(selectedAnswer);
  };

  return (
    <main className="bg-secondaryblue h-screen w-screen ">
      <section className="h-3/5 flex justify-center items-center">
        <Navbar />
        {!isQuizOver && quizState !== null && (
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
                  selectedAnswer
                    ? `rounded-b-md hover:bg-secondaryblue hover:text-white transition`
                    : `opacity-50`
                }`}
                onClick={nextQuestionClickedHandler}
                disabled={
                  selectedAnswer === "" || selectedAnswer === null
                    ? true
                    : false
                }
              >
                Next question
              </button>
            </div>
          </section>
        )}
        <>
          {isQuizOver === true && (
            <div className="bg-white border border-primaryblue rounded-lg shadow p-3">
              <h3 className="text-center text-3xl ">
                Thank you for completing the quiz!
              </h3>
              <p className="text-center text-xl ">
                Your final score:
                {finalScore.statisticDtos.map((s) => (
                  <p className="text-base font-normal">
                    {s.pathName}: &nbsp;
                    {percentageFormatter(s.completedPercentage)}
                  </p>
                ))}
              </p>
            </div>
          )}
        </>
      </section>
    </main>
  );
};

export default Quiz;
