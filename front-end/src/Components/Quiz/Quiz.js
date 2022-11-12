import React from 'react';

import { useState, useEffect } from 'react';
import {
  getStartingQuestion,
  getNextQuestion,
} from '../../Utils/Mock-data/mock-quiz';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    // emulate loading questions
    let firstQuestion = getStartingQuestion();

    console.log(firstQuestion);

    setCurrentQuestion((currentQuestion) => ({
      ...currentQuestion,
      ...firstQuestion,
    }));

    setAnswers(firstQuestion.answers);

    console.log('current question:');
    console.log(currentQuestion.answers);
  }, []);

  const answerClickHandler = (answerId) => {
    setSelectedAnswer(answerId);
    console.log('Current selected answer: ');
    console.log(selectedAnswer);
  };

  const nextQuestionClickedHandler = () => {};

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
        className="self-end border-blue-700 border-2 px-3 py-2"
        onClick={() => {}}
      >
        Next question
      </button>
    </section>
  );
};

export default Quiz;
