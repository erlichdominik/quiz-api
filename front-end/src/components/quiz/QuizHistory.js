import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Navbar from "../ui/Navbar";

const QUIZ_HISTORY_URL = "/quiz/history";

const transformResponseDataToState = (responseData) => {
  const qHistoryItems = [];
  const data = [...responseData];

  data.forEach((item, index) => {
    qHistoryItems.push({
      id: index,
      quizName: item.quizName,
      pathway: item.statisticDtos[0]?.pathName,
      percentage: item.statisticDtos[0]?.completedPercentage,
    });
  });

  return qHistoryItems;
};

const QuizHistory = () => {
  const [quizHistoryItems, setQuizHistoryItems] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const getQuizHistoryData = async () => {
    try {
      const response = await axiosPrivate.get(QUIZ_HISTORY_URL);
      const quizHistoryData = transformResponseDataToState(response.data);
      console.log("transformed response => ", quizHistoryData);
      setQuizHistoryItems(() => quizHistoryData);
    } catch (err) {}
  };

  useEffect(() => {
    getQuizHistoryData();
  }, []);

  return (
    <div className="bg-secondaryblue h-screen w-screen">
      <Navbar />
      {quizHistoryItems?.length === 0 ? (
        <>
          <p className="text-center">
            Looks like there are no history items yet...
          </p>
        </>
      ) : (
        <>
          {
            <div className="pt-8">
              <div className="text-xl text-center">
                Quiz History
                <table className="table-auto ">
                  <thead className="bg-white">
                    <tr className="bg-white">
                      <th>Quiz name</th>
                      <th>Completed pathway</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizHistoryItems?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.quizName}</td>
                        <td>{item.pathway}</td>
                        <td>{item.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default QuizHistory;
