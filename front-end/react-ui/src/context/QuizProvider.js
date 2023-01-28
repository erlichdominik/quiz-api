import { createContext } from "react";
import useQuiz from "../hooks/useQuiz";
import QUIZ_OPTIONS from "../utils/options/quizOptions";

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
    finalScore,
    canQuizBeCompleted,
    setCanQuizBeCompleted,
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
        finalScore,
        canQuizBeCompleted,
        setCanQuizBeCompleted,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
