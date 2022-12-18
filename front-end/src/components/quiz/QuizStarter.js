import React from 'react';
import { Link } from 'react-router-dom';
import useCookieState from '../../hooks/useCookieState';
import Navbar from '../ui/Navbar';
import localKeys from '../../utils/local-storage-keys/localStorageKeys';

const QuizStarter = () => {
  const [isQuizStarted, setIsQuizStarted] = useCookieState(
    false,
    localKeys.IS_QUIZ_STARTED_KEY
  );

  const startNewQuizHandler = () => {
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
