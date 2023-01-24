import React from "react";
import { Link } from "react-router-dom";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import useLanguageContext from "../../hooks/useLanguageContext";
import GroupTable from "./GroupTable";

const singleGroup = [
  {
    id: 1,
    name: "group1",
    groupCode: "abc!@#",
  },
];

const randomInt = () => Math.floor(Math.random() * 99999);

const groupData = () => {
  const groupList = [];
  for (let i = 0; i < 100; i++) {
    groupList.push({
      id: i,
      name: `group ${i}`,
      groupCode: randomInt(),
    });
  }
  return groupList;
};

const Groups = () => {
  const { nameLib } = useLanguageContext();
  const groups = groupData();
  return (
    <>
      <BackgroundWrapper>
        <Card>
          <div className=" w-[24rem] sm:w-1/2 bg-white rounded-lg border border-primaryblue shadow">
            <div className="text-sm w-full h-10 hover:bg-secondaryblue hover:text-white">
              <Link to="/teacherPanel">
                <button className="w-full h-full">
                  {nameLib.backToTeacherPanel}
                </button>
              </Link>
            </div>

            <h1 className="pt-2 text-2xl text-center">{nameLib.groups}</h1>
            <div className="w-full h-3/4 mx-auto pt-2">
              <GroupTable groups={groups} />
            </div>
          </div>
        </Card>
      </BackgroundWrapper>
      <Navbar />
    </>
  );
};

export default Groups;
