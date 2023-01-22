import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import useLanguageContext from "../../hooks/useLanguageContext";

const PASSWORD_RECOVERY_URL = "/auth/password/recover";

const PasswordRecovery = () => {
  const { nameLib } = useLanguageContext();

  const [username, setUsername] = useState("");
  const [firstAnswerRecovery, setFirstAnswerRecovery] = useState("");
  const [secondAnswerRecovery, setSecondAnswerRecovery] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postObj = JSON.stringify({
      login: username,
      firstAnswerRecovery: firstAnswerRecovery,
      secondAnswerRecovery: secondAnswerRecovery,
      newPassword: newPassword,
    });

    try {
      await axios.post(PASSWORD_RECOVERY_URL, postObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setInfoMessage("Recovery succesfull");
    } catch (err) {
      setInfoMessage(err.response.data.message);
    }
  };

  return (
    <main className="bg-secondaryblue h-screen">
      <form onSubmit={handleSubmit} className="my-auto pt-6 h-full">
        <div className="flex flex-col space-y-3 border mx-auto border-darkcl shadow rounded-md bg-white sm:w-1/2">
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
          </div>
          <div className="w-10/12 mx-auto ">
            <label className="block" htmlFor="rePassword">
              {nameLib.favFood}
            </label>
            <input
              className="rounded-xl pl-2 border shadow w-full h-8"
              type="password"
              id="rePassword"
              onChange={(e) => setFirstAnswerRecovery(e.target.value)}
            ></input>
          </div>
          <div className="w-10/12 mx-auto ">
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
    </main>
  );
};

export default PasswordRecovery;
