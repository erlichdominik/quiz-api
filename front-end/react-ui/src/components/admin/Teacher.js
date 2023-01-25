import React from "react";

import useLanguageContext from "../../hooks/useLanguageContext";

const Teacher = ({ teacher }) => {
  const { nameLib } = useLanguageContext();

  return (
    <>
      <div className="self-center text-center col-span-1">{teacher.name}</div>
      <div className="self-center text-center flex justify-center gap-x-2 col-span-2 px-2">
        <button className="text-xs border border-darkcl self-center rounded-xl px-3 py-[2px] hover:bg-danger hover:text-white">
          {nameLib.delete}
        </button>
        <button className="text-xs border border-darkcl self-center rounded-xl px-3 py-[2px] hover:bg-secondaryblue hover:text-white">
          {nameLib.viewGroups}
        </button>
      </div>
    </>
  );
};

export default Teacher;
