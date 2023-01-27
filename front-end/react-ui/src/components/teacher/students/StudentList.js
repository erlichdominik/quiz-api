import React, { useEffect, useState } from "react";
import Student from "./Student";

import useLanguageContext from "../../../hooks/useLanguageContext";

const StudentList = ({
  group,
  students,
  onDeleteAllStudents,
  onDeleteSingleStudent,
}) => {
  const { nameLib } = useLanguageContext();

  return (
    <div className="bg-white border border-primaryblue w-11/12 h-[20rem] mt-3 mx-auto grid auto-rows-max grid-cols-2 gap-y-1 rounded-lg  overflow-y-scroll scroll-smooth">
      <div className="m-1  sticky top-0 bg-white text-center col-span-1 z-0">
        {nameLib.students}
      </div>
      <div className="m-1  sticky top-0 bg-white text-center col-span-1 z-0">
        {nameLib.actions}
      </div>
      {students.map((student) => (
        <Student
          student={student}
          group={group}
          onDeleteSingleStudent={onDeleteSingleStudent}
          onDeleteAllStudents={onDeleteAllStudents}
        />
      ))}
    </div>
  );
};

export default StudentList;
