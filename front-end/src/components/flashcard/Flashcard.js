import React from "react";

const Flashcard = ({ text, description, onClick }) => {
  return (
    <div
      className="flex flex-col items-center w-full bg-white border border-primaryblue rounded-lg shadow space-y-2 h-4/5 cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl border-b border-darkcl pt-2">{text}</h2>
      <div className="pt-6 px-2 mx-auto">{description}</div>
    </div>
  );
};

export default Flashcard;
