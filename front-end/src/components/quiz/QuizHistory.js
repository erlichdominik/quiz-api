import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Navbar from "../ui/Navbar";

const QUIZ_HISTORY_URL = "/quiz/history";

const transformResponseDataToState = (responseData) => {
  const quizHistoryItems = [];
  const data = [...responseData];

  data.forEach((item, index) => {
    quizHistoryItems.push({
      id: index,
      quizName: item.quizName,
      pathway: item.statisticDtos[0]?.pathName,
      percentage: item.statisticDtos[0]?.completedPercentage,
    });
  });

  return quizHistoryItems;
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
      <div className="w-72 text-2xl mx-auto sm:w-1/2">
        {quizHistoryItems?.length === 0 ? (
          <h1 className="text-center align-middle">
            Looks like there are no history items yet...
          </h1>
        ) : (
          <>
            {
              <div className="overflow-x-auto w-1/2 mx-auto pt-8">
                <table className="bg-white border border-primaryblue table-fixed border-separate rounded-xl">
                  <thead className="text-base">
                    <tr className="w-64">
                      <th colspan="3" className="text-xl py-3">
                        Quiz History
                      </th>
                    </tr>
                    <tr>
                      <th scope="col">Quiz name</th>
                      <th scope="col">Completed pathway</th>
                      <th scope="col">Score</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {quizHistoryItems?.map((item) => (
                      <tr className="border-t border-darkcl" key={item.id}>
                        <td className="w-36 py-1">{item.quizName}</td>
                        <td className="w-36 py-1">{item.pathway}</td>
                        <td className="w-36 py-1">{item.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default QuizHistory;
