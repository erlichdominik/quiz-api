import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Layout from './components/main-components/Layout';
import Unauthorized from './components/main-components/Unauthorized';
import Registration from './components/user/Registration';
import MissingPath from './components/main-components/MissingPath';
import RequireAuth from './components/security/RequireAuth';
import USER_ROLES from './utils/roles/authRoles';
import Home from './components/main-components/Home';
import Login from './components/user/Login';
import Quiz from './components/quiz/Quiz';
import AdminPanel from './components/main-components/AdminPanel';
import QuizHistory from './components/quiz/QuizHistory';

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

        {/* Protected routes */}
        {/* Regular user routes*/}
        <Route
          element={<RequireAuth allowedRoles={[USER_ROLES.regularUser]} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="quizHistory" element={<QuizHistory />} />
        </Route>
        {/* Admin routes */}
        <Route element={<RequireAuth allowedRoles={[USER_ROLES.adminUser]} />}>
          <Route path="adminPanel" element={<AdminPanel />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
