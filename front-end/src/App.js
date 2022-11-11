import Login from './Components/User/Login';
import Quiz from './Components/Quiz/Quiz';
import Home from './Components/MainComponents/Home';
import Layout from './Components/MainComponents/Layout';
import MissingPath from './Components/MainComponents/MissingPath';
import RegisterPage from './Components/MainComponents/RegisterPage';
import RequireAuth from './Components/Security/RequireAuth';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<MissingPath />} />
      </Route>
    </Routes>
  );
};

export default App;
