import React, { useState } from "react";
import { Link } from "react-router-dom";

import useLanguageContext from "../../hooks/useLanguageContext";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import AdminGroupTable from "./AdminGroupTable";

const randomInt = () => Math.floor(Math.random() * 99999);

const adminGroupData = () => {
  const groupList = [];
  for (let i = 0; i < 100; i++) {
    groupList.push({
      id: i,
      name: `group ${i}`,
      groupCode: randomInt(),
      teacherName: `teacher ${i}`,
    });
  }
  return groupList;
};

const AdminGroups = () => {
  const { nameLib } = useLanguageContext();

  const groups = adminGroupData();

  return (
    <>
      <BackgroundWrapper>
        <Card>
          <div className="w-[24rem] sm:w-1/2 bg-white rounded-lg border border-primaryblue shadow">
            <div className="text-sm w-full h-10 hover:bg-secondaryblue hover:text-white">
              <Link to="/adminPanel">
                <button className="w-full h-full">
                  {nameLib.backToAdminPanel}
                </button>
              </Link>
            </div>
            <h1 className="pt-2 text-2xl text-center">{nameLib.groups}</h1>
            <div className="w-full h-3/4 mx-auto pt-2">
              <AdminGroupTable groups={groups} />
            </div>
          </div>
        </Card>
      </BackgroundWrapper>
      <Navbar />
    </>
  );
};

export default AdminGroups;
