import React from "react";

import useLanguageContext from "../../hooks/useLanguageContext";

const User = ({ user, onClickDelete }) => {
  const { nameLib } = useLanguageContext();

  const handleUserDelete = () => {
    onClickDelete(user.id);
  };

  return (
    <>
      <div className="self-center text-center col-span-1 px-2 break-words">
        {user.name}
      </div>
      <div className="self-center text-center col-span-1">{user.role}</div>
      <div className="self-center text-center flex justify-center gap-x-2 col-span-1 px-2">
        <button
          className="text-xs border border-darkcl self-center rounded-xl px-3 py-[2px] hover:bg-danger hover:text-white"
          onClick={handleUserDelete}
        >
          {nameLib.delete}
        </button>
      </div>
    </>
  );
};

export default User;
