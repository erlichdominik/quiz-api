import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

import axios from '../../api/axios';

const LOGIN_URL = '/auth/login';

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const usernameRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccesfull, setLoginSuccesfull] = useState(false);

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
      setLoginSuccesfull(true);
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

  return (
    <>
      <section>
        {loginSuccesfull ? (
          <>Congratulations, you succesfully logged in!</>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center space-y-2">
                <p
                  ref={errorRef}
                  className={errorMessage ? 'text-base' : 'hidden'}
                >
                  {errorMessage}
                </p>
                <div>
                  <h1 className="text-2xl">Sign in</h1>
                </div>
                <div>
                  <label className="block" for="username">
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
                  <label className="block" for="password">
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
          </>
        )}
      </section>
    </>
  );
};

export default Login;
