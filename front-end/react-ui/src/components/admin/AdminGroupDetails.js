import React, { useState, useEffect } from "react";

import Card from "../ui/Card";
import StudentList from "./students/StudentList";
import useLanguageContext from "../../hooks/useLanguageContext";
import usePrivateRequests from "../../hooks/usePrivateRequests";

const GET_STUDENTS_URL = (groupId) => `/teacher/groups/${groupId}`;

const DELETE_STUDENT_URL = (groupId, studentId) =>
  `/teacher/remove/group/${groupId}/student/${studentId}`;

const DELETE_STUDENTS_URL = (groupId) => `/teacher/group/${groupId}/students`;

const transformResponseData = (responseData) =>
  responseData.map((student) => ({
    id: student.id,
    name: student.username,
  }));

const GroupDetails = ({ group, onClose }) => {
  const { nameLib } = useLanguageContext();

  const [students, setStudents] = useState([]);

  const getStudentsParams = {
    url: GET_STUDENTS_URL(group.id),
  };

  const deleteAllStudentsParams = {
    url: DELETE_STUDENTS_URL(group.id),
    requestType: "DELETE",
    loadType: "SELF_LOAD",
  };

  const deleteStudentParams = {
    requestType: "POST",
    loadType: "SELF_LOAD",
  };

  const getStudentsRequest = usePrivateRequests(getStudentsParams);
  const deleteStudentRequest = usePrivateRequests(deleteStudentParams);
  const deleteStudentsRequest = usePrivateRequests(deleteAllStudentsParams);

  const loadStudentsData = async () => {
    const response = await getStudentsRequest.performRequest();
    setStudents(transformResponseData(response.data.students));
  };

  const handleDeleteAllStudents = async () => {
    const response = await deleteStudentsRequest.performRequest();
    loadStudentsData();
  };

  const handleDeleteSingleStudent = async (groupId, studentId) => {
    const response = await deleteStudentRequest.performRequest(
      DELETE_STUDENT_URL(groupId, studentId)
    );
    loadStudentsData();
  };

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
        <StudentList
          group={group}
          students={students}
          onDeleteAllStudents={handleDeleteAllStudents}
          onDeleteSingleStudent={handleDeleteSingleStudent}
        />
      </div>
    </Card>
  );
};

export default GroupDetails;
