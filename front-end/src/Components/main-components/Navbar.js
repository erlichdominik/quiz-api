import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import USER_ROLES from '../../utils/roles/authRoles';

const Navbar = () => {
  const { auth } = useAuth();

  console.log('auth: ', auth);

  const canAccessAdmin = auth?.roles?.includes(USER_ROLES.adminUser) ?? false;

  console.log('can access admin? : ', canAccessAdmin);

  return (
    <aside>
      <nav>
        <div className="">
          <ul className="flex flex-col absolute p-2 space-y-5 items-center h-screen text-white text-xl bg-black">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quizStart">Start new quiz</Link>
            </li>
            <li>
              <Link to="/quizHistory">Quiz History</Link>
            </li>
            <li>
              <Link to="/adminPanel">Admin panel</Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
