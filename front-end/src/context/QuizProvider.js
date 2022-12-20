import { createContext } from 'react';
import useQuiz, {
  useQuizStartedState,
  useQuizOverState,
  useSelectedAnswerState,
} from '../hooks/useQuiz';
import QUIZ_OPTIONS from '../utils/options/quizOptions';

const QuizContext = createContext({});

export const QuizProvider = ({ children }) => {
  const [quizState, loadInitialQuestions, loadNextQuestion, disbandQuiz] =
    useQuiz(QUIZ_OPTIONS);

  const [isQuizOver, setIsQuizOver] = useQuizOverState();
  const [isQuizStarted, setIsQuizStarted] = useQuizStartedState();
  const [selectedAnswer, setSelectedAnswer] = useSelectedAnswerState();

  return (
    <QuizContext.Provider
      value={{
        quizState,
        selectedAnswer,
        setSelectedAnswer,
        loadInitialQuestions,
        loadNextQuestion,
        disbandQuiz,
        isQuizOver,
        setIsQuizOver,
        isQuizStarted,
        setIsQuizStarted,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
