import { useContext } from 'react';
import QuizContext from '../context/QuizProvider';

const useQuiz = () => {
  return useContext(QuizContext);
};

export default useQuiz;
