import React, { useRef, useState, useEffect } from 'react';

import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import USER_ROLES from '../../utils/roles/authRoles';
import useRefreshToken from '../../hooks/useRefreshToken';

const LOGIN_URL = '/auth/login';

const Login = () => {
  const { setAuth } = useAuth();

  const refresh = useRefreshToken();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const usernameRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const tryToAuthenticate = async () => {
    const response = await refresh();
  };

  useEffect(() => {
    console.log(tryToAuthenticate());
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
      const refreshToken = response?.data?.refreshToken;

      const roles = [USER_ROLES.regularUser];

      setAuth({ username, password, roles, accessToken, refreshToken });

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

    const roles = [USER_ROLES.regularUser];
    const accessToken = ['123123123asd'];

    setAuth({ username, password, roles, accessToken });

    console.log(username, password, roles, accessToken);

    setUsername('');
    setPassword('');

    navigate(from, { replace: true });
  };

  return (
    <section className="bg-secondaryblue w-screen h-screen">
      <form onSubmit={handleSubmit} className="pt-16">
        <div className="flex flex-col space-y-4 border w-5/12 mx-auto border-darkcl shadow rounded-md bg-white">
          <div className="text-center">
            <h1 className="text-2xl pt-2">Sign in</h1>
          </div>
          <div className="w-10/12 mx-auto">
            <label className="block" htmlFor="username">
              Username:
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="text"
              id="username"
              ref={usernameRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="w-10/12 mx-auto">
            <label className="block" htmlFor="password">
              Password:
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="py-2 text-center">
            <button className="border border-darkcl px-4 py-2 rounded-xl shadow">
              Sign in
            </button>
          </div>
          <div className="text-center">
            <p ref={errorRef} className={errorMessage ? 'text-base' : 'hidden'}>
              {errorMessage}
            </p>
          </div>
          <div className="text-center">
            Don't have an account? &nbsp;
            <span className="font-bold underline">
              <Link to="/register">Sign up</Link>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
