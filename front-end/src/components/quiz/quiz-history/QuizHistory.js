import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import { mockQuizHistoryItems } from "../../../utils/mock-data/mock-quiz-history";

import Navbar from "../../ui/Navbar";

const QUIZ_HISTORY_URL = "/quiz/history";

const transformResponseDataToState = (responseData) => {
  const quizHistoryItems = [];
  const data = [...responseData];

  data.forEach((item, index) => {
    quizHistoryItems.push({
      id: index,
      quizName: item.quizName,
      completionDate: item.completionDate,
      pathways: item.statisticsDtos,
    });
  });

  return quizHistoryItems;
};

const QuizHistory = () => {
  const [quizHistoryItems, setQuizHistoryItems] = useState(
    transformResponseDataToState(mockQuizHistoryItems)
  );
  const axiosPrivate = useAxiosPrivate();

  const getQuizHistoryData = async () => {
    try {
      const response = await axiosPrivate.get(QUIZ_HISTORY_URL);
      const quizHistoryData = transformResponseDataToState(response.data);
      console.log("transformed response => ", quizHistoryData);
      setQuizHistoryItems(() => quizHistoryData);
    } catch (err) {}
  };

  const stateTester = () =>
    console.log("quiz history items => ", quizHistoryItems);

  const getDateString = (dateObj) => dateObj.toISOString().split("T")[0];

  /*
  useEffect(() => {
    getQuizHistoryData();
  }, []);
  */

  return (
    <main className="bg-secondaryblue h-screen w-screen overflow-auto">
      <Navbar />
      <div className="flex h-3/5 items-center justify-center overflow-y-auto">
        {quizHistoryItems.length === 0 ? (
          <h1 className="text-3xl text-white">
            Looks like the quiz history is empty...
          </h1>
        ) : (
          <table className="table-auto w-1/2 bg-white border border-primaryblue rounded shadow">
            <thead className="w-full">
              <tr>
                <th rowspan="2">Quiz Name</th>
                <th rowspan="2">Completion Date</th>
                <th colspan="4">Pathways</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th>Path name</th>
                <th>Completed percentage</th>
              </tr>
            </thead>
            <tbody>
              {quizHistoryItems.map((item, index) => (
                <tr className="text-center">
                  <td>{item.quizName}</td>
                  <td>{getDateString(item.completionDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default QuizHistory;
