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

  const listItemStyle =
    'border-t border-white w-48 text-center py-3 hover:bg-darkclLighter';

  return (
    <aside>
      <nav>
        <div className="">
          <ul className="flex flex-col absolute pt-8 items-center h-screen text-white text-xl bg-darkcl">
            <Link to="/">
              <li className={listItemStyle}>Home</li>
            </Link>
            <Link to="/quizStart">
              <li className={listItemStyle}>Start new quiz</li>
            </Link>
            {!isQuizContextEmpty && (
              <Link to="/quiz">
                <li className={listItemStyle}>Continue quiz</li>
              </Link>
            )}
            <Link to="/quizHistory">
              <li className={listItemStyle}>Quiz History</li>
            </Link>
            {canAccessAdmin && (
              <Link to="/adminPanel">
                <li className={listItemStyle}>Admin panel</li>
              </Link>
            )}
            <li className={`${listItemStyle}`}>
              <Link
                to="/login"
                onClick={() => {
                  setQuizState(() => ({}));
                }}
              >
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
