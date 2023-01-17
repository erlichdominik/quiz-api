import React from "react";
import QuizHistoryItem from "./QuizHistoryItem";

const QuizHistoryTable = ({ quizHistory }) => {
  return (
    <div className="bg-white h-[30rem] border border-primaryblue rounded-lg grid grid-cols-3 text-center w-1/2 mx-auto gap-y-4 overflow-y-scroll scroll-smooth">
      <div className="pt-2 sticky top-0 bg-white">Quiz name</div>
      <div className="pt-2 sticky top-0 bg-white">Date of completion</div>
      <div className="pt-2 sticky top-0 bg-white">Pathway scores</div>
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
