import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import useLanguageContext from "../../hooks/useLanguageContext";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import QuizTitle from "../ui/QuizTitle";
import { PASSWORD_REGEX } from "../../utils/regexes/userRegex";

const PASSWORD_RECOVERY_URL = "/auth/password/recover";

const PasswordRecovery = () => {
  const { nameLib } = useLanguageContext();

  const [username, setUsername] = useState("");
  const [firstAnswerRecovery, setFirstAnswerRecovery] = useState("");
  const [secondAnswerRecovery, setSecondAnswerRecovery] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postObj = JSON.stringify({
      login: username,
      firstAnswerRecovery: firstAnswerRecovery,
      secondAnswerRecovery: secondAnswerRecovery,
      newPassword: newPassword,
    });

    if (!isPasswordValid) {
      setInfoMessage(nameLib.invalidPassword);
      return;
    }

    try {
      await axios.post(PASSWORD_RECOVERY_URL, postObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setInfoMessage(nameLib.recoverySuccessfull);
    } catch (err) {
      setInfoMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    setIsPasswordValid(PASSWORD_REGEX.test(newPassword));
  }, [newPassword]);

  return (
    <BackgroundWrapper>
      <QuizTitle />
      <Card topPadding="0">
        <form
          onSubmit={handleSubmit}
          className="my-auto w-[24rem] sm:w-[34rem] rounded-lg shadow border border-primaryblue "
        >
          <div className="flex flex-col w-full rounded-lg space-y-3 bg-white">
            <div className="text-center">
              <p className="text-3xl pt-2 ">{nameLib.recoverPassword}</p>
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
                {nameLib.newPassword}
              </label>
              <input
                className="rounded-xl pl-2 border shadow w-full h-8"
                type="password"
                id="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
              <p
                className={`text-xs ${
                  isPasswordValid ? `text-correct` : `text-danger`
                }`}
              >
                {nameLib.passwordInfo}
              </p>
            </div>
            <div className="w-10/12 mx-auto ">
              <label className="block" htmlFor="rePassword">
                {nameLib.favFood}
              </label>
              <input
                className="rounded-xl pl-2 border shadow w-full h-8"
                type="text"
                id="firstAnswerRecovery"
                onChange={(e) => setFirstAnswerRecovery(e.target.value)}
              ></input>
            </div>
            <div className="w-10/12 mx-auto ">
              <label className="block" htmlFor="rePassword">
                {nameLib.firstPetName}
              </label>
              <input
                className="rounded-xl pl-2 border shadow w-full h-8"
                type="text"
                id="secondAnswerRecovery"
                onChange={(e) => setSecondAnswerRecovery(e.target.value)}
              ></input>
            </div>
            <div className="text-center">
              <p>{infoMessage}</p>
            </div>
            <div className="text-center">
              <button
                className="border border-darkcl px-4 py-2 rounded-xl shadow"
                disabled={false}
              >
                {nameLib.recoverPassword}
              </button>
            </div>
            <div className="text-center px-2">
              {nameLib.haveYouManagedToRecover} &nbsp;
              <span className="font-bold underline">
                <Link to="/login">{nameLib.signIn}</Link>
              </span>
            </div>
            <div className="text-center px-2">
              {nameLib.didntManageToRecover} &nbsp;
              <span className="font-bold underline">
                <Link to="/register">{nameLib.register}</Link>
              </span>
            </div>
          </div>
        </form>
      </Card>
    </BackgroundWrapper>
  );
};

export default PasswordRecovery;
