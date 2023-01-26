import React, { useState } from "react";

import Card from "../ui/Card";
import StudentList from "./students/StudentList";
import useLanguageContext from "../../hooks/useLanguageContext";
import usePrivateRequests from "../../hooks/usePrivateRequests";

const GroupDetails = ({ group, onClose, onDeleteAllStudents }) => {
  const { nameLib } = useLanguageContext();

  const handleDeleteAllStudents = () => {
    onDeleteAllStudents(group);
  };

  return (
    <Card topPadding="1">
      <div className="w-full h-full ">
        <div className="flex justify-end pr-2 pt-1">
          <div
            className="rounded-full w-4 h-4 bg-danger cursor-pointer"
            onClick={onClose}
          ></div>
        </div>
        <h1 className="text-2xl text-center ">{`${group.name} ${nameLib.details}`}</h1>
        <div className="flex justify-center mx-2 space-x-2 pt-2 ">
          <button className="border border-darkcl px-3 py-1 rounded-xl text-sm w-[12rem] hover:bg-secondaryblue hover:text-white transition">
            {nameLib.downloadGroupScore}
          </button>
          <button
            className="border border-darkcl px-3 py-1 rounded-xl text-sm w-[12rem] hover:bg-danger hover:text-white transition"
            onClick={handleDeleteAllStudents}
          >
            {nameLib.deleteAllStudents}
          </button>
        </div>
        <StudentList group={group} />
      </div>
    </Card>
  );
};

export default GroupDetails;
