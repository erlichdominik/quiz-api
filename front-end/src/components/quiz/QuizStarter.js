import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import useQuiz from '../../hooks/useQuiz';

const QuizStarter = () => {
  const [setQuizStarted, setQuizOver] = useQuiz();

  const startNewQuizHandler = () => {
    console.log('start new quiz clicked');
    setQuizStarted(true);
    setQuizOver(false);
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
