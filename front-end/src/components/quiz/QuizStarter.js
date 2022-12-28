import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import useQuizContext from '../../hooks/useQuizContext';

const QuizStarter = () => {
  const {
    isQuizOver,
    setIsQuizOver,
    isQuizStarted,
    setIsQuizStarted,
    disbandQuiz,
  } = useQuizContext();

  const startNewQuizHandler = () => {
    disbandQuiz();
    setIsQuizStarted(true);
    setIsQuizOver(false);
  };

  return (
    <>
      <Navbar />
      <div className="text-2xl text-center">
        <div className="text-2xl text-center pt-10">
          <Link to="/quiz">
            <button onClick={startNewQuizHandler}>Start new quiz</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuizStarter;
