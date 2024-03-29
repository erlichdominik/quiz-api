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
import StudentCredit from "./components/student/StudentCredit";
import CreateGroup from "./components/teacher/CreateGroup";
import Groups from "./components/teacher/Groups";
import CreateTeacher from "./components/admin/CreateTeacher";
import AdminGroups from "./components/admin/AdminGroups";
import AllUsers from "./components/admin/AllUsers";
import Tutorial from "./components/user/Tutorial";

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
            <Route
              path="flashcardCategories"
              element={<FlashcardCategories />}
            />
            <Route path="tutorial" element={<Tutorial />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[USER_ROLES.regularUser]} />}
          >
            <Route path="studentCredit" element={<StudentCredit />}></Route>
          </Route>
          <Route
            element={
              <RequireAuth
                allowedRoles={[USER_ROLES.regularUser, USER_ROLES.teacherUser]}
              />
            }
          >
            <Route path="quiz" element={<Quiz />} />
            <Route path="quizStart" element={<QuizStarter />} />
            <Route path="quizHistory" element={<QuizHistory />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[USER_ROLES.teacherUser]} />}
          >
            <Route path="teacherPanel" element={<TeacherPanel />} />
            <Route path="createGroup" element={<CreateGroup />} />
            <Route path="groups" element={<Groups />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[USER_ROLES.adminUser]} />}
          >
            <Route path="adminPanel" element={<AdminPanel />} />
            <Route path="createTeacher" element={<CreateTeacher />} />
            <Route path="adminGroups" element={<AdminGroups />} />
            <Route path="allUsers" element={<AllUsers />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
