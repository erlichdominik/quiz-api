import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import useLanguageContext from "../../hooks/useLanguageContext";

import { USERNAME_REGEX, PASSWORD_REGEX } from "../../utils/regexes/userRegex";

const REGISTER_URL = "/auth/register";

const Registration = () => {
  const { nameLib } = useLanguageContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstAnswerRecovery, setFirstAnswerRecovery] = useState("");
  const [secondAnswerRecovery, setSecondAnswerRecovery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postObj = JSON.stringify({
      login: username,
      password: password,
      firstAnswerRecovery: firstAnswerRecovery,
      secondAnswerRecovery: secondAnswerRecovery,
    });

    try {
      await axios.post(REGISTER_URL, postObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setErrorMessage("Registration succesful");
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <section className="bg-secondaryblue h-screen">
      <form onSubmit={handleSubmit} className="my-auto pt-6 h-full">
        <div className="flex flex-col space-y-3 border mx-auto border-darkcl shadow rounded-md bg-white sm:w-1/2">
          <div className="text-center">
            <p className="text-3xl pt-2 ">{nameLib.register}</p>
          </div>
          <div className="w-10/12 mx-auto">
            <label className="block" htmlFor="username">
              {nameLib.username}
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
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
            ></input>
          </div>
          <div className="w-10/12 mx-auto">
            <label className="block" htmlFor="rePassword">
              {nameLib.reEnterPassword}
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="password"
              id="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </div>
          <div className="w-10/12 mx-auto text-center">
            <p className="text-xs">({nameLib.passwordRecoveryQuestion})</p>
            <label className="block" htmlFor="rePassword">
              {nameLib.favFood}
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="text"
              id="rePassword"
              onChange={(e) => setFirstAnswerRecovery(e.target.value)}
            ></input>
          </div>
          <div className="w-10/12 mx-auto text-center">
            <p className="text-xs">({nameLib.passwordRecoveryQuestion})</p>
            <label className="block" htmlFor="rePassword">
              {nameLib.firstPetName}
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="password"
              id="rePassword"
              onChange={(e) => setSecondAnswerRecovery(e.target.value)}
            ></input>
          </div>
          <div className="text-center">
            <p>{errorMessage}</p>
          </div>
          <div className="text-center">
            <button
              className="border border-darkcl px-4 py-2 rounded-xl shadow"
              disabled={false}
            >
              {nameLib.signUp}
            </button>
          </div>
          <div className="text-center px-2">
            {nameLib.alreadyHaveAccount} &nbsp;
            <span className="font-bold underline">
              <Link to="/login">{nameLib.signIn}</Link>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Registration;
