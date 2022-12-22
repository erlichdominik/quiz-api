import { createContext } from 'react';
import useQuiz, {
  useQuizStartedState,
  useQuizOverState,
  useSelectedAnswerState,
} from '../hooks/useQuiz';
import QUIZ_OPTIONS from '../utils/options/quizOptions';

const QuizContext = createContext({});

export const QuizProvider = ({ children }) => {
  const [
    quizState,
    loadInitialQuestions,
    loadNextQuestion,
    disbandQuiz,
    isQuizOver,
    setIsQuizOver,
    isQuizStarted,
    setIsQuizStarted,
    selectedAnswer,
    setSelectedAnswer,
  ] = useQuiz(QUIZ_OPTIONS);

  return (
    <QuizContext.Provider
      value={{
        quizState,
        loadInitialQuestions,
        loadNextQuestion,
        disbandQuiz,
        isQuizOver,
        setIsQuizOver,
        isQuizStarted,
        setIsQuizStarted,
        selectedAnswer,
        setSelectedAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
