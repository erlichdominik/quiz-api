import React, { useRef, useState, useEffect } from 'react';

import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import USER_ROLES from '../../Utils/Roles/authRoles';

const LOGIN_URL = '/auth/login';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const usernameRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postObj = JSON.stringify({ email: username, password: password });

    try {
      const response = await axios.post(LOGIN_URL, postObj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ username, password, roles, accessToken });

      console.log(setAuth);

      setUsername('');
      setPassword('');

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrorMessage('No server response');
      } else if (err.response.status === 400) {
        setErrorMessage('Missing username or password');
      } else if (err.response?.status === 401) {
        setErrorMessage('Invalid credentials');
      } else {
        setErrorMessage('Login failed');
      }
    }
  };

  const mockHandleSubmit = (e) => {
    e.preventDefault();

    const roles = [USER_ROLES.regularUser, USER_ROLES.adminUser];
    const accessToken = ['123123123asd'];

    setAuth({ username, password, roles, accessToken });

    console.log(username, password, roles, accessToken);

    setUsername('');
    setPassword('');

    navigate(from, { replace: true });
  };

  return (
    <section>
      <form onSubmit={mockHandleSubmit}>
        <div className="flex flex-col items-center space-y-2">
          <p ref={errorRef} className={errorMessage ? 'text-base' : 'hidden'}>
            {errorMessage}
          </p>
          <div>
            <h1 className="text-2xl">Sign in</h1>
          </div>
          <div>
            <label className="block" htmlFor="username">
              Username:
            </label>
            <input
              className=""
              type="text"
              id="username"
              ref={usernameRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div>
            <label className="block" htmlFor="password">
              Password:
            </label>
            <input
              className=""
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="py-2">
            <button className="border-blue-400 border-2 rounded-xl px-3 py-2">
              Sign in
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;