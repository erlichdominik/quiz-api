import React, { useEffect, useState } from 'react';

import { mockQuizHistoryItems } from '../../utils/mock-data/mock-quiz-history';

const QuizHistory = () => {
  const [quizHistoryItems, setQuizHistoryItems] = useState([]);

  useEffect(() => {
    // simulate getting data from api
    setQuizHistoryItems((quizHistoryItems) => [...mockQuizHistoryItems]);
  }, []);

  return (
    <div className="text-xl text-center">
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
              <td>{item.accuracy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizHistory;
