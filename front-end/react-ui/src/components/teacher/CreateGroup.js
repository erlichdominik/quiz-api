import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import useLanguageContext from "../../hooks/useLanguageContext";
import { Link } from "react-router-dom";
import usePrivateRequests from "../../hooks/usePrivateRequests";

const CREATE_GROUP_URL = "/teacher/create/group";

const CreateGroup = () => {
  const { nameLib } = useLanguageContext();
  const [date, setDate] = useState("");
  const [groupName, setGroupName] = useState("");
  const [info, setInfo] = useState("");

  const queryParams = {
    groupName: groupName,
    deadline: date,
  };

  const privateRequestParams = {
    url: CREATE_GROUP_URL,
    requestType: "POST",
    queryParams: queryParams,
    loadType: "SELF_LOAD",
  };

  const { responseCode, infoMessage, loadData } =
    usePrivateRequests(privateRequestParams);

  const handleSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value.toString());
  };

  useEffect(() => {
    if (responseCode === 200) {
      setInfo("Group created succesfully");
    } else if (infoMessage) {
      setInfo(infoMessage);
    }
  }, [responseCode, infoMessage]);
  return (
    <>
      <BackgroundWrapper>
        <Card>
          <div className=" w-[20rem] sm:w-[26rem] bg-white rounded-lg border border-primaryblue shadow">
            <div className="text-sm w-full h-10 hover:bg-secondaryblue hover:text-white">
              <Link to="/teacherPanel">
                <button className="w-full h-full">
                  {nameLib.backToTeacherPanel}
                </button>
              </Link>
            </div>
            <h1 className="pt-2 text-2xl text-center">{nameLib.createGroup}</h1>
            <form onSubmit={handleSubmit}>
              <div className="w-full h-1/2 min-h-max flex flex-col items-center justify-center space-y-6 py-6">
                <div className="w-3/4 mx-auto">
                  <label className="block" htmlFor="groupName">
                    {nameLib.groupName}
                  </label>
                  <input
                    className="rounded-xl pl-2 border shadow w-full h-8"
                    id="groupName"
                    type="text"
                    onChange={handleGroupNameChange}
                  />
                </div>
                <div className="w-3/4 mx-auto">
                  <label className="block" htmlFor="groupStartDate">
                    {nameLib.createGroupDate}
                  </label>
                  <input
                    className="rounded-xl pl-2 border shadow w-full h-8"
                    id="groupStartDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="w-1/4 mx-auto pt-2 text-center">
                  <button className="border border-darkcl w-max px-4 py-2 rounded-xl shadow hover:bg-secondaryblue hover:text-white transition">
                    {nameLib.createGroup}
                  </button>
                </div>
                <p className="text-center w-full">{info}</p>
              </div>
            </form>
          </div>
        </Card>
      </BackgroundWrapper>
      <Navbar />
    </>
  );
};

export default CreateGroup;
