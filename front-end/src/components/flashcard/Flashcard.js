import React from "react";

const Flashcard = ({
  text,
  description,
  onClick,
  isFinished,
  onResetClick,
}) => {
  return (
    <>
      {!isFinished ? (
        <div
          className="flex flex-col items-center w-full bg-white border border-primaryblue rounded-lg shadow space-y-2 h-4/5 cursor-pointer select-none"
          onClick={onClick}
        >
          <h2 className="text-xl border-b border-darkcl pt-2">{text}</h2>
          <div className="pt-6 px-2 mx-auto">{description}</div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full bg-white border border-primaryblue rounded-lg shadow h-4/5 min-h-max select-none">
          <h2 className="text-xl pt-3 pb-8 px-2 text-center">
            This flashcard category is finished, do you want to start it again?
          </h2>
          <button
            className="bg-secondaryblue h-10 text-white w-full text-sm border border-white shadow rounded-lg px-2 py-1 "
            onClick={onResetClick}
          >
            Start over
          </button>
        </div>
      )}
    </>
  );
};

export default Flashcard;
