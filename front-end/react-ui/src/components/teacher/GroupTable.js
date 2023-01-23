import React, { useState } from "react";
import useLanguageContext from "../../hooks/useLanguageContext";
import Modal from "../ui/Modal";
import Group from "./Group";

const GroupTable = ({ groups }) => {
  const { nameLib } = useLanguageContext();

  const [modalVisible, setModalVisible] = useState(true);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleGroupDelete = () => {};

  const handleGroupInspect = () => {};

  return (
    <>
      {modalVisible && (
        <Modal onClose={handleModalClose}>
          <div className="w-72 h-72 bg-white"></div>
        </Modal>
      )}
      <div className="bg-white border border-primaryblue w-5/6 h-full mx-auto grid auto-rows-max grid-cols-4 gap-y-1 rounded-lg  overflow-y-scroll scroll-smooth">
        <div className="pt-1 sticky top-0 bg-white text-center col-span-1 z-0">
          {nameLib.groupName}
        </div>
        <div className="pt-1 sticky top-0 bg-white text-center col-span-1 z-0">
          {nameLib.groupCode}
        </div>
        <div className="pt-1 sticky top-0 bg-white text-center col-span-2 z-0">
          {nameLib.actions}
        </div>
        {groups.map((group) => (
          <Group group={group} />
        ))}
      </div>
    </>
  );
};

export default GroupTable;
