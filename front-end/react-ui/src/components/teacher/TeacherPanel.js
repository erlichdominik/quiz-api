import React from "react";
import Navbar from "../ui/Navbar";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import useLanguageContext from "../../hooks/useLanguageContext";
import { Link } from "react-router-dom";

const TeacherPanel = () => {
  const { nameLib } = useLanguageContext();

  return (
    <>
      <BackgroundWrapper>
        <Card>
          <div className="h-2/3 w-[20rem] sm:w-[26rem] bg-white rounded-lg border border-primaryblue shadow">
            <h1 className="py-4 text-2xl text-center">
              {nameLib.teacherPanel}
            </h1>
            <div className="w-full h-1/2 min-h-max flex flex-col items-center justify-center space-y-10 py-12">
              <div className="w-10/12  border border-darkcl rounded-lg text-center cursor-pointer hover:bg-secondaryblue hover:text-white transition">
                <Link to="/groups">
                  <div className="w-full h-full p-2">{nameLib.groups}</div>
                </Link>
              </div>
              <div className="w-10/12  border border-darkcl rounded-lg text-center cursor-pointer hover:bg-secondaryblue hover:text-white transition">
                <Link to="/createGroup">
                  <div className="w-full h-full p-2">{nameLib.createGroup}</div>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </BackgroundWrapper>
      <Navbar />
    </>
  );
};

export default TeacherPanel;
