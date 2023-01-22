import { Routes, Route } from "react-router-dom";
import Home from "./components/main-components/Home";
import Layout from "./components/main-components/Layout";
import Unauthorized from "./components/main-components/Unauthorized";
import MissingPath from "./components/main-components/MissingPath";
import Login from "./components/user/Login";
import Registration from "./components/user/Registration";
import RequireAuth from "./components/security/RequireAuth";
import PersistLogin from "./components/user/PersistLogin";
import USER_ROLES from "./utils/roles/authRoles";
import Quiz from "./components/quiz/Quiz";
import QuizHistory from "./components/quiz/quiz-history/QuizHistory";
import QuizStarter from "./components/quiz/QuizStarter";
import FlashcardCategories from "./components/flashcard/FlashcardCategories";
import PasswordRecovery from "./components/user/PasswordRecovery";
import TeacherPanel from "./components/teacher/TeacherPanel";
import AdminPanel from "./components/admin/AdminPanel";
import StudentGroup from "./components/student/StudentGroup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="passwordRecovery" element={<PasswordRecovery />} />
        {/* 404 page */}
        <Route path="*" element={<MissingPath />} />

        {/* All logged in user routes*/}
        <Route element={<PersistLogin />}>
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  USER_ROLES.regularUser,
                  USER_ROLES.teacherUser,
                  USER_ROLES.adminUser,
                ]}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="quizStart" element={<QuizStarter />} />
            <Route path="quizHistory" element={<QuizHistory />} />
            <Route
              path="flashcardCategories"
              element={<FlashcardCategories />}
            />
            <Route path="studentGroup" element={<StudentGroup />}></Route>
          </Route>
          <Route
            element={
              <RequireAuth
                allowedRoles={[USER_ROLES.teacherUser, USER_ROLES.adminUser]}
              />
            }
          >
            <Route path="teacherPanel" element={<TeacherPanel />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[USER_ROLES.adminUser]} />}
          >
            <Route path="adminPanel" element={<AdminPanel />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
