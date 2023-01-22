import React, { useRef, useState, useEffect } from "react";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useLanguageContext from "../../hooks/useLanguageContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

import USER_ROLES from "../../utils/roles/authRoles";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useAuth();
  const { nameLib } = useLanguageContext();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const usernameRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postObj = JSON.stringify({ email: username, password: password });

    try {
      const response = await axios.post(LOGIN_URL, postObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;

      const roles = [USER_ROLES.regularUser];

      setAuth({ username, password, roles, accessToken, refreshToken });

      setUsername("");
      setPassword("");

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrorMessage("No server response");
      } else if (err.response.status === 400) {
        setErrorMessage("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrorMessage("Invalid credentials");
      } else {
        setErrorMessage("Login failed");
      }
    }
  };

  return (
    <main className="bg-secondaryblue w-screen h-screen">
      <form onSubmit={handleSubmit} className="pt-6">
        <div className="flex flex-col space-y-3 border w-72 mx-auto border-darkcl shadow rounded-md bg-white sm:w-1/2">
          <div className="text-center">
            <h1 className="text-3xl pt-2">{nameLib.signIn}</h1>
          </div>
          <div className="w-10/12 mx-auto">
            <label className="block" htmlFor="username">
              {nameLib.username}
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
              {nameLib.password}
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
          <div className="pt-2 text-center">
            <button className="border border-darkcl w-max px-4 py-2 rounded-xl shadow">
              {nameLib.signIn}
            </button>
          </div>
          <div className="text-center">
            <p ref={errorRef} className={errorMessage ? "text-base" : "hidden"}>
              {errorMessage}
            </p>
          </div>
          <div className="text-center px-2 mt-0">
            {nameLib.dontHaveAccount} &nbsp;
            <span className="font-bold underline">
              <Link to="/register" className="inline-block">
                {nameLib.signUp}
              </Link>
            </span>
          </div>
          <div className="text-center px-2">
            {nameLib.forgotYourPasswordOrWantToChangeIt} &nbsp;
            <span className="font-bold underline">
              <Link to="/passwordRecovery" className="inline-block">
                {nameLib.recoverPassword}
              </Link>
            </span>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Login;
