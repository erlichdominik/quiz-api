import Login from './Components/User/Login';
import Registration from './Components/User/Registration';
import AdminPanel from './Components/MainComponents/AdminPanel';
import Quiz from './Components/Quiz/Quiz';
import Home from './Components/MainComponents/Home';
import Layout from './Components/MainComponents/Layout';
import MissingPath from './Components/MainComponents/MissingPath';
import RequireAuth from './Components/Security/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import USER_ROLES from './Utils/Roles/authRoles';
import Unauthorized from './Components/MainComponents/Unauthorized';
import { QuizProvider } from './context/QuizProvider';

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
