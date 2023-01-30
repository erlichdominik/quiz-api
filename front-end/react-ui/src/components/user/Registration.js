import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import useLanguageContext from "../../hooks/useLanguageContext";

import { USERNAME_REGEX, PASSWORD_REGEX } from "../../utils/regexes/userRegex";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";

const REGISTER_URL = "/auth/register";

const Registration = () => {
  const { nameLib } = useLanguageContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstAnswerRecovery, setFirstAnswerRecovery] = useState("");
  const [secondAnswerRecovery, setSecondAnswerRecovery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null);

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
      setErrorMessage(nameLib.registrationSuccessfull);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <BackgroundWrapper>
      <Card>
        <form
          onSubmit={handleSubmit}
          className="my-auto w-[24rem] sm:w-[34rem] rounded-lg shadow border border-primaryblue "
        >
          <div className="flex flex-col w-full rounded-lg space-y-3 bg-white">
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
              <p className="text-xs ">{nameLib.passwordInfo}</p>
            </div>
            <div className="w-10/12 mx-auto text-center">
              <p className="text-xs">({nameLib.passwordRecoveryQuestion})</p>
              <label className="block" htmlFor="rePassword">
                {nameLib.favFood}
              </label>
              <input
                className="rounded-xl pl-2 border shadow w-full h-8"
                type="text"
                id="firstPassRecovery"
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
                type="text"
                id="secondPassRecovery"
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
      </Card>
    </BackgroundWrapper>
  );
};

export default Registration;
