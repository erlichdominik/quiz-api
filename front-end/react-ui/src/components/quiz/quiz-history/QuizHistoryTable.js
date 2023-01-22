import React from "react";
import QuizHistoryItem from "./QuizHistoryItem";
import useLanguageContext from "../../../hooks/useLanguageContext";

const QuizHistoryTable = ({ quizHistory }) => {
  const { nameLib } = useLanguageContext();
  return (
    <div
      className={`bg-white h-[24rem] border border-primaryblue rounded-lg grid auto-rows-max grid-cols-3 text-center w-2/3 mx-auto gap-y-4 overflow-y-scroll scroll-smooth`}
    >
      <div className="pt-2 sticky top-0 bg-white ">{nameLib.quizName}</div>
      <div className="pt-2 sticky top-0 bg-white">
        {nameLib.dateOfCompletion}
      </div>
      <div className="pt-2 sticky top-0 bg-white">{nameLib.pathwayScores}</div>
      {quizHistory.map((item) => (
        <QuizHistoryItem
          id={item.id}
          completionDate={item.completionDate}
          quizName={item.quizName}
          pathways={item.pathways}
        />
      ))}
    </div>
  );
};

export default QuizHistoryTable;
