import React, { useState } from "react";
import useLanguageContext from "../../hooks/useLanguageContext";
import Modal from "../ui/Modal";
import Group from "./Group";
import GroupDetails from "./GroupDetails";

const GroupTable = ({ groups }) => {
  const { nameLib } = useLanguageContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleGroupDelete = (group) => {};

  const handleGroupInspect = (group) => {
    setSelectedGroup(group);
    setModalVisible(true);
    console.log("selected group", group);
  };

  return (
    <>
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
            onClickDelete={handleGroupDelete}
            onClickInspect={handleGroupInspect}
          />
        ))}
      </div>

      {modalVisible && (
        <Modal onClose={handleModalClose}>
          <GroupDetails onClose={handleModalClose} group={selectedGroup} />
        </Modal>
      )}
    </>
  );
};

export default GroupTable;
