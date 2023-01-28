import { wait } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import useConfirmationControls from "../../hooks/useConfirmationControls";
import useLanguageContext from "../../hooks/useLanguageContext";
import usePrivateRequests from "../../hooks/usePrivateRequests";
import ConfirmationPopup from "../ui/ConfirmationPopup";
import Modal from "../ui/Modal";
import Group from "./Group";
import GroupDetails from "./GroupDetails";

const DELETE_GROUP_URL = (groupId) => `/teacher/groups/${groupId}`;
const DELETE_STUDENTS_URL = (groupId) => `/teacher/groups/${groupId}/students`;

const GroupTable = ({ groups, onGroupDelete }) => {
  const { nameLib } = useLanguageContext();

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleStudentsDelete = (group) => {
    deleteStudentsRequest.performRequest(DELETE_STUDENTS_URL(group.id));
  };

  const handleGroupDelete = async (group) => {
    setSelectedGroup(group);
    await processAction(
      () => deleteGroupRequest.performRequest(DELETE_GROUP_URL(group.id)),
      onGroupDelete
    );
  };

  const handleGroupInspect = (group) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  return (
    <>
      <div className="mx-auto w-fit">
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
      <div className="bg-white border border-primaryblue w-11/12 h-full mx-auto grid auto-rows-max grid-cols-4 gap-y-1 rounded-lg  overflow-y-scroll scroll-smooth">
        <div className="m-1 sticky top-0 bg-white text-center col-span-1 z-0">
          {nameLib.groupName}
        </div>
        <div className="m-1 sticky top-0 bg-white text-center col-span-1 z-0">
          {nameLib.groupCode}
        </div>
        <div className="m-1 sticky top-0 bg-white text-center col-span-2 z-0">
          {nameLib.actions}
        </div>
        {groups.map((group) => (
          <Group
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
            onDeleteAllStudents={handleStudentsDelete}
            delegatedAction={confirmationAction}
            onRefreshData={onGroupDelete}
          />
        </Modal>
      )}
    </>
  );
};

export default GroupTable;
