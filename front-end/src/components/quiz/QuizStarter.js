import React from 'react';
import { Link } from 'react-router-dom';
import useQuiz from '../../hooks/useQuiz';
import Navbar from '../ui/Navbar';

const QuizStarter = () => {
  const { quizState, setQuizState, setIsQuizStarted } = useQuiz();

  const startNewQuizHandler = () => {
    setQuizState(() => ({}));
    setIsQuizStarted(true);
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
