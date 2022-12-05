import { Routes, Route } from 'react-router-dom';
import Home from './components/main-components/Home';
import Layout from './components/main-components/Layout';
import Unauthorized from './components/main-components/Unauthorized';
import MissingPath from './components/main-components/MissingPath';
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import RequireAuth from './components/security/RequireAuth';
import USER_ROLES from './utils/roles/authRoles';
import Quiz from './components/quiz/Quiz';
import QuizHistory from './components/quiz/QuizHistory';
import QuizStarter from './components/quiz/QuizStarter';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* 404 page */}
        <Route path="*" element={<MissingPath />} />

        {/* Regular user routes*/}
        <Route
          element={<RequireAuth allowedRoles={[USER_ROLES.regularUser]} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="quizStart" element={<QuizStarter />} />
          <Route path="quizHistory" element={<QuizHistory />} />
        </Route>
        {/* Admin routes */}
        <Route
          element={<RequireAuth allowedRoles={[USER_ROLES.adminUser]} />}
        ></Route>
      </Route>
    </Routes>
  );
};

export default App;
