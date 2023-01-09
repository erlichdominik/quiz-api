import React from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useQuizContext from "../../hooks/useQuizContext";
import { faCoffee } from "@fortawesome/react-fontawesome";

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
      <div className="flex justify-between">
        <div className="w-full hover:bg-darkclLighter transition inline-block text-center">
          <Link to="/quizStart">
            <li className="px-2 py-2 w-full">Start new quiz</li>
          </Link>
        </div>
        {isQuizStarted && !isQuizOver && (
          <div className="w-full hover:bg-darkclLighter transition inline-block text-center">
            <Link to="/quiz">
              <li className="px-2 py-2 w-full">Continue quiz</li>
            </Link>
          </div>
        )}
        <div className="w-full hover:bg-darkclLighter transition inline-block text-center">
          <Link to="/quizHistory">
            <li className="px-2 py-2 w-full">Quiz History</li>
          </Link>
        </div>
        <div className="w-full hover:bg-darkclLighter transition inline-block text-center">
          <Link to="/login" onClick={logoutClickedHandler}>
            <li className="px-2 py-2 w-full">Log out</li>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
