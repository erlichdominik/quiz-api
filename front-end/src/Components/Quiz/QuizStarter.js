import React from 'react';
import { Link } from 'react-router-dom';
import useQuiz from '../../hooks/useQuiz';

const QuizStarter = () => {
  const { quizState, setQuizState } = useQuiz();

  const isQuizContextEmpty = Object.keys(quizState).length === 0;

  const startNewQuizHandler = () => {
    setQuizState(() => ({}));
  };

  return (
    <>
      {isQuizContextEmpty ? (
        <>
          <div>Start new Quiz</div>
          <button>
            <Link to="/quiz">Start</Link>
          </button>
        </>
      ) : (
        <>
          <div className="text-center">
            There is already a quiz in progress, continue?
            <div>
              <button>
                <Link to="/quiz">Yes</Link>
              </button>
            </div>
            <div>
              <button onClick={startNewQuizHandler}>
                <Link to="/quiz">No, start new</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuizStarter;
