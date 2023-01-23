import React from "react";

const percentageFormatter = (percentageValue) =>
  `${(percentageValue * 100).toFixed(2)}%`;

const QuizHistoryItem = ({ id, quizName, completionDate, pathways }) => {
  return (
    <>
      <div className="self-center">{quizName}</div>
      <div className="self-center">{completionDate}</div>
      <div>
        {pathways.map((pathway) => (
          <div className="pb-1">
            {pathway.pathName}:{" "}
            {percentageFormatter(pathway.completedPercentage)}
          </div>
        ))}
      </div>
    </>
  );
};

export default QuizHistoryItem;
