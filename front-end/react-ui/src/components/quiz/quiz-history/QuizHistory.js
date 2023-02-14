import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useLanguageContext from "../../../hooks/useLanguageContext";

import Navbar from "../../ui/Navbar";
import QuizHistoryTable from "./QuizHistoryTable";

const QUIZ_HISTORY_URL = "/quiz/history";

const transformResponseDataToState = (responseData) => {
  const quizHistoryItems = [];
  const data = [...responseData];

  data.forEach((item, index) => {
    quizHistoryItems.push({
      id: index,
      quizName: item.quizName,
      completionDate: item.date,
      pathways: item.statisticDtos.sort((a, b) =>
        a.pathName.localeCompare(b.pathName)
      ),
    });
  });

  return quizHistoryItems;
};

const QuizHistory = () => {
  const [quizHistoryItems, setQuizHistoryItems] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { nameLib } = useLanguageContext();

  const getQuizHistoryData = async () => {
    try {
      const response = await axiosPrivate.get(QUIZ_HISTORY_URL);
      const quizHistoryData = transformResponseDataToState(response.data);
      setQuizHistoryItems(quizHistoryData);
    } catch (err) {}
  };

  useEffect(() => {
    getQuizHistoryData();
  }, []);

  return (
    <>
      <main className="bg-secondaryblue h-screen w-screen ">
        <section className="flex items-center h-4/5 w-full justify-center pt-6">
          {quizHistoryItems.length === 0 ? (
            <h1 className="text-3xl text-white pt-10">
              {nameLib.quizHistoryEmpty}
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
