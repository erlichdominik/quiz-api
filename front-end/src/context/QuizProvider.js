import { createContext, useState } from 'react';

const QuizContext = createContext({});

export const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState({});

  console.log(quizState);

  return (
    <QuizContext.Provider value={{ quizState, setQuizState }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
