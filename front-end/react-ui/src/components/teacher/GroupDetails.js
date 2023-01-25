import React from "react";

import Card from "../ui/Card";
import StudentList from "./students/StudentList";
import useLanguageContext from "../../hooks/useLanguageContext";

const GroupDetails = ({ students, group, onClose }) => {
  const { nameLib } = useLanguageContext();

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
          <button className="border border-darkcl px-3 py-1 rounded-xl text-sm w-[12rem] hover:bg-danger hover:text-white transition">
            {nameLib.deleteAllStudents}
          </button>
        </div>
        <StudentList students={students} group={group} />
      </div>
    </Card>
  );
};

export default GroupDetails;
