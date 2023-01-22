import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../ui/Navbar";
import useQuizContext from "../../hooks/useQuizContext";
import useLanguageContext from "../../hooks/useLanguageContext";

const QuizStarter = () => {
  const { setIsQuizOver, setIsQuizStarted, disbandQuiz } = useQuizContext();
  const { nameLib } = useLanguageContext();

  const startNewQuizHandler = () => {
    disbandQuiz();
    setIsQuizStarted(true);
    setIsQuizOver(false);
  };

  return (
    <div className="bg-secondaryblue h-screen w-screen">
      <div className="flex h-4/5 justify-center items-center">
        <Navbar />
        <div className="text-4xl text-center hover:text-white p-4 transition">
          <Link to="/quiz">
            <button onClick={startNewQuizHandler}>
              {nameLib.startNewQuiz}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizStarter;
