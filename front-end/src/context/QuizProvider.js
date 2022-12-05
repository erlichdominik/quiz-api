import { createContext, useState } from 'react';

const QuizContext = createContext({});

export const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState({});
  const [isQuizOver, setIsQuizOver] = useState(false);

  console.log('quiz state: ', quizState);
  console.log('is quiz over: ', isQuizOver);

  return (
    <QuizContext.Provider
      value={{ quizState, setQuizState, isQuizOver, setIsQuizOver }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
