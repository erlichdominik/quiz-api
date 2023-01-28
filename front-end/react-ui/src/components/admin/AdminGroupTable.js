import React, { useState } from "react";
import useLanguageContext from "../../hooks/useLanguageContext";
import Modal from "../ui/Modal";
import AdminGroup from "./AdminGroup";
import GroupDetails from "../teacher/GroupDetails";
import usePrivateRequests from "../../hooks/usePrivateRequests";
import useConfirmationControls from "../../hooks/useConfirmationControls";
import ConfirmationPopup from "../ui/ConfirmationPopup";

const DELETE_GROUP_URL = (groupId) => `/teacher/groups/${groupId}`;
const DELETE_STUDENTS_URL = (groupId) => `/teacher/groups/${groupId}/students`;

const AdminGroupDable = ({ groups, onGroupDelete }) => {
  const { nameLib } = useLanguageContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const {
    setDisableConfirmation,
    confirmationVisible,
    confirmationAction,
    handleConfirmationClose,
    processAction,
  } = useConfirmationControls();

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

  const handleStudentsDelete = async (group) => {
    processAction(
      () => deleteStudentsRequest.performRequest(DELETE_STUDENTS_URL(group.id)),
      () => onGroupDelete()
    );
  };

  const handleGroupDelete = async (group) => {
    processAction(
      () => deleteGroupRequest.performRequest(DELETE_GROUP_URL(group.id)),
      () => onGroupDelete()
    );
  };

  const handleGroupInspect = (group) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  return (
    <>
      <div className="mx-auto w-fit py-2">
        <label className="px-2" htmlFor="disableActionConfirmation">
          {nameLib.disableActionConfirmation}
        </label>
        <input
          className="align-middle"
          type="checkbox"
          id="disableActionConfirmation"
          onClick={() => setDisableConfirmation((prev) => !prev)}
        />
      </div>
      <div className="bg-white border border-primaryblue w-11/12 h-[85%] mx-auto grid auto-rows-max grid-cols-5 gap-y-1 rounded-lg  overflow-y-scroll scroll-smooth">
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
      {confirmationVisible && (
        <Modal shouldCloseOnBackgroundClick={false}>
          <ConfirmationPopup
            onClose={handleConfirmationClose}
            delegatedAction={confirmationAction}
            onRefreshData={onGroupDelete}
          />
        </Modal>
      )}
    </>
  );
};

export default AdminGroupDable;
