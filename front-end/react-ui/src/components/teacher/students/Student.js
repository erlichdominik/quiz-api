import React from "react";

import useLanguageContext from "../../../hooks/useLanguageContext";

const Student = ({ student }) => {
  const { nameLib } = useLanguageContext();

  return (
    <>
      <div className="self-center text-center col-span-1">{student.name}</div>
      <div className="self-center text-center flex justify-center gap-x-2 col-span-1 px-2">
        <button className="text-xs border border-darkcl self-center rounded-xl px-3 py-[2px] hover:bg-danger hover:text-white">
          {nameLib.delete}
        </button>
      </div>
    </>
  );
};

export default Student;
