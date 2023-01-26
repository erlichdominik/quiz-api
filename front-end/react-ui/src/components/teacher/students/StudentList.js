import React, { useEffect, useState } from "react";
import Student from "./Student";

import useLanguageContext from "../../../hooks/useLanguageContext";
import usePrivateRequests from "../../../hooks/usePrivateRequests";

const GET_STUDENTS_URL = (groupId) => `/teacher/groups/${groupId}`;

const DELETE_STUDENT_URL = (groupId, studentId) =>
  `/teacher/remove/group/${groupId}/student/${studentId}`;

const transformResponseData = (responseData) =>
  responseData.map((student) => ({
    id: student.id,
    name: student.username,
  }));

const StudentList = ({ group }) => {
  const { nameLib } = useLanguageContext();

  const [students, setStudents] = useState([]);

  const studentRequestParams = {
    url: GET_STUDENTS_URL(group.id),
  };

  const deleteStudentsParams = {
    requestType: "POST",
    loadType: "SELF_LOAD",
  };

  const getStudentsRequest = usePrivateRequests(studentRequestParams);

  const deleteStudentRequest = usePrivateRequests(deleteStudentsParams);

  useEffect(() => {
    if (
      !getStudentsRequest.isLoading &&
      getStudentsRequest.responseCode === 200
    ) {
      setStudents(
        transformResponseData(getStudentsRequest.responseData.students)
      );
    }
  }, [getStudentsRequest.isLoading, getStudentsRequest.responseCode]);

  const handleDeleteSingleStudent = async (groupId, studentId) => {
    await deleteStudentRequest.performRequest(
      DELETE_STUDENT_URL(groupId, studentId)
    );
    console.log(deleteStudentRequest.responseCode);
    if (deleteStudentRequest.responseCode === 200) {
      console.log("asd");
      setStudents((students) =>
        students.filter((stud) => stud.id !== studentId)
      );
    }
  };

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
          onDeleteSingleStudent={handleDeleteSingleStudent}
        />
      ))}
    </div>
  );
};

export default StudentList;
