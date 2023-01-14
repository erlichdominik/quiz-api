import { useContext } from "react";
import QuizContext from "../context/QuizProvider";

const useQuizContext = () => {
  return useContext(QuizContext);
};

export default useQuizContext;
