import React from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useQuizContext from "../../hooks/useQuizContext";
import NavItem from "./NavItem";
import StartQuizIcon from "../../assets/start-quiz.svg";
import ContinueQuizIcon from "../../assets/continue-quiz.svg";
import QuizHistoryIcon from "../../assets/quiz-history.svg";
import LogoutIcon from "../../assets/logout.svg";
import { ReactComponent as LogoutIconTest } from "../../assets/quiz-history.svg";

const Navbar = () => {
  const { isQuizStarted, isQuizOver, disbandQuiz } = useQuizContext();

  const axiosPrivate = useAxiosPrivate();

  const logoutClickedHandler = async () => {
    try {
      console.log("Logout clicked");
      disbandQuiz();
      await axiosPrivate.get("/logout");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="fixed bottom-0 inset-x-0 ">
      <div className="flex justify-between bg-white">
        <NavItem
          icon={StartQuizIcon}
          label="Start quiz"
          alt="start quiz icon"
          linkTo="/quizStart"
        />
        {isQuizStarted && !isQuizOver && (
          <NavItem
            icon={ContinueQuizIcon}
            label="Continue quiz"
            alt="continue quiz icon"
            linkTo="/quiz"
          />
        )}
        <NavItem
          icon={QuizHistoryIcon}
          label="Quiz history"
          alt="quiz history icon"
          linkTo="/quizHistory"
        />
        <NavItem
          icon={LogoutIcon}
          label="Logout"
          alt="logout icon"
          linkTo="/login"
          onClick={logoutClickedHandler}
        />
      </div>
    </section>
  );
};

export default Navbar;
