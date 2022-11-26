import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useQuiz from '../../hooks/useQuiz';

import USER_ROLES from '../../utils/roles/authRoles';

const Navbar = () => {
  const { auth } = useAuth();
  const { quizState } = useQuiz();

  const canAccessAdmin = auth?.roles?.includes(USER_ROLES.adminUser) ?? false;

  const isQuizContextEmpty = Object?.keys(quizState)?.length === 0 ?? true;

  return (
    <aside>
      <nav>
        <div className="">
          <ul className="flex flex-col absolute p-2 space-y-5 items-center h-screen w-60 text-white text-xl bg-black">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quizStart">Start new quiz</Link>
            </li>
            {!isQuizContextEmpty && (
              <li>
                <Link to="/quiz">Continue quiz</Link>
              </li>
            )}
            <li>
              <Link to="/quizHistory">Quiz History</Link>
            </li>
            {canAccessAdmin && (
              <li>
                <Link to="/adminPanel">Admin panel</Link>
              </li>
            )}
            <li>
              <Link to="/login">Log out</Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
