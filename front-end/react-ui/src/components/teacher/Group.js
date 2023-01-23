import React from "react";
import useLanguageContext from "../../hooks/useLanguageContext";

const Group = ({ group, onClickDelete, onClickInspect }) => {
  const { nameLib } = useLanguageContext();

  const handleGroupDelete = () => {};

  const handleGroupInspect = () => {};

  return (
    <>
      <div className="self-center text-center col-span-1">{group.name}</div>
      <div className="self-center text-center col-span-1">
        {group.groupCode}
      </div>
      <div className="self-center text-center flex justify-center gap-x-2 col-span-2 px-2">
        <button className="text-xs border border-darkcl self-center rounded-xl px-3 py-[2px] hover:bg-darkcl hover:text-white">
          {nameLib.deleteGroup}
        </button>
        <button className="text-xs border border-darkcl self-center rounded-xl px-3 py-[2px] hover:bg-secondaryblue hover:text-white">
          {nameLib.groupDetails}
        </button>
      </div>
    </>
  );
};

export default Group;
