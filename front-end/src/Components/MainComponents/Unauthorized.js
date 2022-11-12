import { useNavigate } from 'react-router-dom';
import React from 'react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="font-bold text-4xl text-red-500">
      You are not authorized to view this page
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Take me back
      </button>
    </div>
  );
};

export default Unauthorized;
