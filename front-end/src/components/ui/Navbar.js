import React from 'react';
import { Link } from 'react-router-dom';
import useQuiz from '../../hooks/useQuiz';

const Navbar = () => {
  const { quizState, setQuizState } = useQuiz();

  return (
    <aside>
      <nav>
        <div className="">
          <ul className="flex flex-col float-left pt-8 space-y-4 items-center w-32 min-w-fit h-screen text-white text-xl bg-darkcl">
            <div className="w-full hover:bg-darkclLighter transition">
              <Link to="/quizStart">
                <li className="px-2 py-2 w-full">Start new quiz</li>
              </Link>
            </div>
            {quizState.isQuizOver && (
              <div className="w-full hover:bg-darkclLighter transition">
                <Link to="/quiz">
                  <li className="px-2 py-2 w-full">Continue quiz</li>
                </Link>
              </div>
            )}
            <div className="w-full hover:bg-darkclLighter transition">
              <Link to="/quizHistory">
                <li className="px-2 py-2 w-full">Quiz History</li>
              </Link>
            </div>
            <div className="w-full hover:bg-darkclLighter transition">
              <Link
                to="/login"
                onClick={() => {
                  setQuizState(() => ({}));
                }}
              >
                <li className="px-2 py-2 w-full">Log out</li>
              </Link>
            </div>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
