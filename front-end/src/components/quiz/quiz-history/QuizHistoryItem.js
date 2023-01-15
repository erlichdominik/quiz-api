import React from "react";

const percentageFormatter = (percentageValue) =>
  `${(percentageValue * 100).toFixed(2)}%`;

const getDateString = (dateObj) => dateObj?.toISOString().split("T")[0];

const QuizHistoryItem = ({ id, quizName, completionDate, pathways }) => {
  return (
    <>
      <div className="self-center">{quizName}</div>
      <div className="self-center">{getDateString(completionDate)}</div>
      <div>
        {pathways.map((pathway) => (
          <>
            <div className="inline-block pb-1">
              {pathway.pathName}:{" "}
              {percentageFormatter(pathway.completedPercentage)}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default QuizHistoryItem;
