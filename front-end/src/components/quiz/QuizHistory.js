import React, { useEffect, useState } from 'react';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Navbar from '../ui/Navbar';

const QUIZ_HISTORY_URL = '/quiz/history';

const QuizHistory = () => {
  const [quizHistoryItems, setQuizHistoryItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const axiosPrivate = useAxiosPrivate();

  const getQuizHistoryData = async () => {
    try {
      const response = await axiosPrivate.get(QUIZ_HISTORY_URL);
      console.log(response.data);
      setQuizHistoryItems(...response.data);
    } catch (err) {
      console.log('error', err);
      setErrorMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    getQuizHistoryData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="text-xl text-center font-sanspro">
        Quiz History
        <table className="table-auto border border-slate-400 border-spacing-3 border-separate mx-auto mt-5 ">
          <thead>
            <tr>
              <th>Quiz name</th>
              <th>Date of completion</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {quizHistoryItems.map((item) => (
              <tr key={item.id}>
                <td>{item.quizName}</td>
                <td>{item.completionDate.toLocaleString()}</td>
                <td>{}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuizHistory;
