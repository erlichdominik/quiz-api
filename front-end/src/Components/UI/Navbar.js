import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useQuiz from '../../hooks/useQuiz';

import USER_ROLES from '../../utils/roles/authRoles';

const Navbar = () => {
  const { auth } = useAuth();
  const { quizState, setQuizState } = useQuiz();

  const canAccessAdmin = auth?.roles?.includes(USER_ROLES.adminUser) ?? false;

  const isQuizContextEmpty = Object?.keys(quizState)?.length === 0 ?? true;

  return (
    <aside>
      <nav>
        <div className="">
          <ul className="flex flex-col float-left pt-8 space-y-4 items-center w-32 h-screen text-white text-xl bg-darkcl">
            <Link className="w-max h-max" to="/">
              <div className="w-24 h-24">asd</div>
            </Link>
            <div>
              <Link to="/quizStart">
                <li className="px-2 ">Start new quiz</li>
              </Link>
            </div>
            {!isQuizContextEmpty && (
              <div>
                <Link to="/quiz">
                  <li className="px-2 ">Continue quiz</li>
                </Link>
              </div>
            )}
            <div>
              <Link to="/quizHistory">
                <li className="px-2 ">Quiz History</li>
              </Link>
            </div>
            <div>
              <Link
                to="/login"
                onClick={() => {
                  setQuizState(() => ({}));
                }}
              >
                <li className="px-2 ">Log out</li>
              </Link>
            </div>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
