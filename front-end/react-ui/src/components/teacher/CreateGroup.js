import React from "react";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import useLanguageContext from "../../hooks/useLanguageContext";
import { Link } from "react-router-dom";

const CreateGroup = () => {
  const { nameLib } = useLanguageContext();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <BackgroundWrapper>
        <Card>
          <div className="h-2/3 w-[20rem] sm:w-[26rem] bg-white rounded-lg border border-primaryblue shadow">
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
                  />
                </div>
                <div className="w-1/4 mx-auto pt-2 text-center">
                  <button className="border border-darkcl w-max px-4 py-2 rounded-xl shadow hover:bg-secondaryblue hover:text-white transition">
                    {nameLib.createGroup}
                  </button>
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

export default CreateGroup;
