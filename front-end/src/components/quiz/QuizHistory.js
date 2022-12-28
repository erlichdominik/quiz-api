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
      {quizHistoryItems?.length === 0 ? (
        <>
          <p className="text-center">
            Looks like there are no history items yet...
          </p>
        </>
      ) : (
        <>
          {
            <div className="overflow-x-auto w-1/2 mx-auto pt-8">
              <table className="bg-white table-fixed border border-primaryblue rounded border-collapse min-w-full">
                <thead className="bg-white text-lg">
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
                      <td className="w-36">{item.quizName}</td>
                      <td className="w-36">{item.pathway}</td>
                      <td className="w-36">{item.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default QuizHistory;
