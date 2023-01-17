import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import Navbar from "../../ui/Navbar";
import QuizHistoryTable from "./QuizHistoryTable";

const QUIZ_HISTORY_URL = "/quiz/history";

const transformResponseDataToState = (responseData) => {
  const quizHistoryItems = [];
  const data = [...responseData];
  console.log("DATA", data);

  data.forEach((item, index) => {
    quizHistoryItems.push({
      id: index,
      quizName: item.quizName,
      completionDate: item.date,
      pathways: item.statisticDtos,
    });
  });

  return quizHistoryItems;
};

const QuizHistory = () => {
  const [quizHistoryItems, setQuizHistoryItems] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  console.log("quiz history items", quizHistoryItems);

  const getQuizHistoryData = async () => {
    try {
      const response = await axiosPrivate.get(QUIZ_HISTORY_URL);
      const quizHistoryData = transformResponseDataToState(response.data);
      console.log("transformed response => ", quizHistoryData);
      setQuizHistoryItems(quizHistoryData);
    } catch (err) {}
  };

  useEffect(() => {
    getQuizHistoryData();
  }, []);

  return (
    <>
      <main className="bg-secondaryblue h-screen w-screen ">
        <section className="flex items-center justify-center pt-6">
          {quizHistoryItems.length === 0 ? (
            <h1 className="text-3xl text-white pt-10">
              Looks like the quiz history is empty...
            </h1>
          ) : (
            <QuizHistoryTable quizHistory={quizHistoryItems} />
          )}
        </section>
      </main>
      <Navbar />
    </>
  );
};

export default QuizHistory;
