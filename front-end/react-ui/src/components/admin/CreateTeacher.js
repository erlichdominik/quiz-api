import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import useLanguageContext from "../../hooks/useLanguageContext";
import { Link } from "react-router-dom";
import usePrivateRequests from "../../hooks/usePrivateRequests";

const CREATE_TEACHER_URL = "/admin/create/teacher";
const CreateTeacher = () => {
  const { nameLib } = useLanguageContext();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [firstAnswerRecovery, setFirstAnswerRecovery] = useState("");
  const [secondAnswerRecovery, setSecondAnswerRecovery] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const createTeacherParams = {
    url: CREATE_TEACHER_URL,
    body: {
      login,
      password,
      firstAnswerRecovery,
      secondAnswerRecovery,
    },
    requestType: "POST",
    loadType: "SELF_LOAD",
  };
  const createTeacherRequest = usePrivateRequests(createTeacherParams);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login && password && firstAnswerRecovery && secondAnswerRecovery) {
      console.log("creating teacher... ", createTeacherParams.body);
      await createTeacherRequest.performRequest();
    }
  };

  useEffect(() => {
    if (createTeacherRequest.isLoading) {
      setInfoMessage(nameLib.loading);
    }
    if (createTeacherRequest.responseCode === 200) {
      setInfoMessage(nameLib.teacherCreated);
    } else {
      setInfoMessage(createTeacherRequest.infoMessage);
    }
  }, [
    createTeacherRequest.responseCode,
    createTeacherRequest.isLoading,
    createTeacherRequest.infoMessage,
  ]);

  return (
    <>
      <BackgroundWrapper>
        <Card>
          <div className=" w-[20rem] sm:w-[26rem] bg-white rounded-lg border border-primaryblue shadow">
            <div className="text-sm w-full h-10 hover:bg-secondaryblue hover:text-white">
              <Link to="/adminPanel">
                <button className="w-full h-full">
                  {nameLib.backToAdminPanel}
                </button>
              </Link>
            </div>
            <h1 className="pt-2 text-2xl text-center">
              {nameLib.createTeacher}
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="w-full h-1/2 min-h-max flex flex-col items-center justify-center space-y-3 py-3">
                <div className="w-3/4 ">
                  <label className="block" htmlFor="teacherLogin">
                    {nameLib.teacherLogin}
                  </label>
                  <input
                    className="rounded-xl pl-2 border shadow w-full h-8"
                    id="teacherLogin"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </div>
                <div className="w-3/4 ">
                  <label className="block" htmlFor="teacherPassword">
                    {nameLib.teacherPassword}
                  </label>
                  <input
                    className="rounded-xl pl-2 border shadow w-full h-8"
                    id="teacherPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-3/4 ">
                  <label className="block" htmlFor="phraseOne">
                    {nameLib.teacherPhraseOne}
                  </label>
                  <input
                    className="rounded-xl pl-2 border shadow w-full h-8"
                    id="phraseOne"
                    type="text"
                    value={firstAnswerRecovery}
                    onChange={(e) => setFirstAnswerRecovery(e.target.value)}
                  />
                </div>
                <div className="w-3/4 ">
                  <label className="block" htmlFor="phraseTwo">
                    {nameLib.teacherPhraseTwo}
                  </label>
                  <input
                    className="rounded-xl pl-2 border shadow w-full h-8"
                    id="phraseTwo"
                    type="text"
                    value={secondAnswerRecovery}
                    onChange={(e) => setSecondAnswerRecovery(e.target.value)}
                  />
                </div>
                <div>
                  <button className="border border-darkcl w-max px-4 py-2 rounded-xl shadow hover:bg-secondaryblue hover:text-white transition">
                    {nameLib.createTeacher}
                  </button>
                </div>
                <div>
                  <p className="text-base">{infoMessage}</p>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </BackgroundWrapper>
      <Navbar />
    </>
  );
};

export default CreateTeacher;
