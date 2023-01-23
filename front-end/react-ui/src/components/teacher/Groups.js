import React from "react";
import { Link } from "react-router-dom";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import useLanguageContext from "../../hooks/useLanguageContext";

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
          <div className="h-5/6 w-[24rem] sm:w-1/2 bg-white rounded-lg border border-primaryblue shadow">
            <div className="text-sm w-full h-10 hover:bg-secondaryblue hover:text-white">
              <Link to="/teacherPanel">
                <button className="w-full h-full">
                  {nameLib.backToTeacherPanel}
                </button>
              </Link>
            </div>

            <h1 className="pt-2 text-2xl text-center">{nameLib.groups}</h1>
            <div className="w-full h-3/4 mx-auto pt-2">
              <div className="bg-white border border-primaryblue w-5/6 h-full mx-auto grid auto-rows-max grid-cols-4 gap-y-1 rounded-lg  overflow-y-scroll scroll-smooth">
                <div className="pt-1 sticky top-0 bg-white text-center col-span-1">
                  {nameLib.groupName}
                </div>
                <div className="pt-1 sticky top-0 bg-white text-center col-span-1">
                  {nameLib.groupCode}
                </div>
                <div className="pt-1 sticky top-0 bg-white text-center col-span-2">
                  {nameLib.actions}
                </div>
                {groups.map((group) => (
                  <>
                    <div className="self-center text-center col-span-1">
                      {group.name}
                    </div>
                    <div className="self-center text-center col-span-1">
                      {group.groupCode}
                    </div>
                    <div className="self-center text-center flex justify-center gap-x-2 col-span-2 px-2">
                      <button className="bg-darkcl text-white text-xs  self-center rounded-xl px-3 py-[2px]">
                        Delete group
                      </button>
                      <button className="bg-primaryblue text-white text-xs rounded-xl px-3 py-[2px]">
                        Inspect group
                      </button>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </BackgroundWrapper>
      <Navbar />
    </>
  );
};

export default Groups;
