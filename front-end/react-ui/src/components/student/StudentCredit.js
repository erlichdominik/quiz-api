import React, { useState } from "react";
import Navbar from "../ui/Navbar";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import useLanguageContext from "../../hooks/useLanguageContext";
import usePrivateRequests from "../../hooks/usePrivateRequests";

const STUDENT_GROUP_URL = "/student/group";

const StudentCredit = () => {
  const { nameLib } = useLanguageContext();

  const [creditCode, setCreditCode] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const creditParams = {
    url: STUDENT_GROUP_URL,
    queryParams: {
      groupCode: creditCode,
    },
    requestType: "POST",
    loadType: "SELF_LOAD",
  };
  const creditRequest = usePrivateRequests(creditParams);

  const handleCodeInput = (e) => {
    setCreditCode(e.target.value);
    setInfoMessage("");
  };

  // modern
  const handleAddToGroupClick = async () => {
    const response = await creditRequest.performRequest();
    if (response?.status === 200) {
      setInfoMessage(nameLib.successfullyAddedToGroup);
    } else {
      setInfoMessage(creditRequest.infoMessage);
    }
  };

  return (
    <BackgroundWrapper>
      <Card>
        <div className="h-2/3 w-[20rem] bg-white border border-primaryblue rounded-lg shadow flex flex-col items-center justify-around space-y-2 my-2">
          <div>
            <h1 className="text-center text-2xl ">{nameLib.enterCreditCode}</h1>
          </div>
          <div className="w-10/12 mx-auto">
            <label
              htmlFor="studentCredit"
              className="block text-center w-full pb-2"
            >
              {nameLib.creditCode}
            </label>
            <input
              type="text"
              id="studentCredit"
              className="block w-4/5 border border-darkcl rounded-xl pl-2 h-8 mx-auto my-auto text-center"
              onChange={handleCodeInput}
            />
          </div>
          <div className="w-full mx-auto text-center ">
            <button
              className="border border-darkcl w-max px-4 py-2 mb-2 rounded-xl shadow hover:bg-secondaryblue hover:text-white transition"
              onClick={handleAddToGroupClick}
            >
              {nameLib.addToGroup}
            </button>
            <p className="pt-1">{infoMessage}</p>
          </div>
        </div>
      </Card>
      <Navbar />
    </BackgroundWrapper>
  );
};

export default StudentCredit;
