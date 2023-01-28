import React, { useState } from "react";
import useLanguageContext from "../../hooks/useLanguageContext";
import Modal from "../ui/Modal";
import AdminGroup from "./AdminGroup";
import GroupDetails from "../teacher/GroupDetails";
import usePrivateRequests from "../../hooks/usePrivateRequests";

const DELETE_GROUP_URL = (groupId) => `/teacher/groups/${groupId}`;
const DELETE_STUDENTS_URL = (groupId) => `/teacher/groups/${groupId}/students`;

const AdminGroupDable = ({ groups, onGroupDelete }) => {
  const { nameLib } = useLanguageContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const deleteGroupParams = {
    requestType: "DELETE",
    loadType: "SELF_LOAD",
  };

  const deleteStudentsParams = {
    requestType: "DELETE",
    loadType: "SELF_LOAD",
  };

  const deleteGroupRequest = usePrivateRequests(deleteGroupParams);
  const deleteStudentsRequest = usePrivateRequests(deleteStudentsParams);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleStudentsDelete = (group) => {
    deleteStudentsRequest.performRequest(DELETE_STUDENTS_URL(group.id));
  };

  const handleGroupDelete = async (group) => {
    setSelectedGroup(group);
    await deleteGroupRequest.performRequest(DELETE_GROUP_URL(group.id));
    onGroupDelete();
  };

  const handleGroupInspect = (group) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  return (
    <>
      <div className="bg-white border border-primaryblue w-11/12 h-full mx-auto grid auto-rows-max grid-cols-5 gap-y-1 rounded-lg  overflow-y-scroll scroll-smooth">
        <div className="m-1 sticky top-0 bg-white text-center col-span-1 z-0">
          {nameLib.groupName}
        </div>
        <div className="m-1 sticky top-0 bg-white text-center col-span-1 z-0">
          {nameLib.groupCode}
        </div>
        <div className="m-1 sticky top-0 bg-white text-center col-span-1 z-0">
          {nameLib.teacherName}
        </div>
        <div className="m-1 sticky top-0 bg-white text-center col-span-2 z-0">
          {nameLib.actions}
        </div>
        {groups.map((group) => (
          <AdminGroup
            group={group}
            key={group.id}
            onClickDelete={handleGroupDelete}
            onClickInspect={handleGroupInspect}
          />
        ))}
      </div>

      {modalVisible && (
        <Modal onClose={handleModalClose}>
          <GroupDetails
            onClose={handleModalClose}
            group={selectedGroup}
            onDeleteAllStudents={handleStudentsDelete}
          />
        </Modal>
      )}
    </>
  );
};

export default AdminGroupDable;
