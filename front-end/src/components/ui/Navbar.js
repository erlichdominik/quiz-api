import React from 'react';
import { Link } from 'react-router-dom';
import useCookieState from '../../hooks/useCookieState';
import localKeys from '../../utils/local-storage-keys/localStorageKeys';

const Navbar = () => {
  const [isQuizStarted, setIsQuizStarted] = useCookieState(
    false,
    localKeys.IS_QUIZ_STARTED_KEY
  );

  const logoutClickedHandler = () => {};

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
            {isQuizStarted && (
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
              <Link to="/login" onClick={logoutClickedHandler}>
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
