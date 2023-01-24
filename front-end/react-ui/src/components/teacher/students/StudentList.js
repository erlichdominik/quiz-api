import React from "react";
import Student from "./Student";

import useLanguageContext from "../../../hooks/useLanguageContext";

const randomInt = () => Math.floor(Math.random() * 99999);

const studentData = () => {
  const studentList = [];
  for (let i = 0; i < 100; i++) {
    studentList.push({
      id: i,
      name: `student ${i}`,
    });
  }
  return studentList;
};

const StudentList = ({ group }) => {
  const { nameLib } = useLanguageContext();

  const students = studentData();

  return (
    <div className="bg-white border border-primaryblue w-11/12 h-[20rem] mt-3 mx-auto grid auto-rows-max grid-cols-3 gap-y-1 rounded-lg  overflow-y-scroll scroll-smooth">
      <div className="m-1  sticky top-0 bg-white text-center col-span-1 z-0">
        {nameLib.students}
      </div>
      <div className="m-1  sticky top-0 bg-white text-center col-span-2 z-0">
        {nameLib.actions}
      </div>
      {students.map((student) => (
        <Student student={student} />
      ))}
    </div>
  );
};

export default StudentList;
