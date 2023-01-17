import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <QuizProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </QuizProvider>
    </AuthProvider>
  </BrowserRouter>
);
