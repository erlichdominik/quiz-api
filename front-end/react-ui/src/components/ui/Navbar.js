import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useQuizContext from "../../hooks/useQuizContext";
import useLanguageContext from "../../hooks/useLanguageContext";
import NavItem from "./NavItem";
import StartQuizIcon from "../../assets/start-quiz.svg";
import ContinueQuizIcon from "../../assets/continue-quiz.svg";
import QuizHistoryIcon from "../../assets/quiz-history.svg";
import LogoutIcon from "../../assets/logout.svg";
import FlashcardIcon from "../../assets/flashcards.svg";
import StudentGroupIcon from "../../assets/student-group.svg";
import AdminPanelIcon from "../../assets/admin-panel.svg";
import TeacherPanelIcon from "../../assets/teacher-panel.svg";
import useAuth from "../../hooks/useAuth";
import USER_ROLES from "../../utils/roles/authRoles";

const hasStudentRole = (roles) => roles.includes(USER_ROLES.regularUser);

const hasTeacherRole = (roles) => roles.includes(USER_ROLES.teacherUser);

const hasAdminRole = (roles) => roles.includes(USER_ROLES.adminUser);

const Navbar = () => {
  const { isQuizStarted, isQuizOver, disbandQuiz } = useQuizContext();
  const { nameLib } = useLanguageContext();
  const { auth } = useAuth();
  const roles = auth.roles;

  const axiosPrivate = useAxiosPrivate();

  const logoutClickedHandler = async () => {
    try {
      console.log("Logout clicked");
      disbandQuiz();
      await axiosPrivate.get("/logout");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 ">
      <div className="flex justify-between bg-white">
        <NavItem
          icon={StartQuizIcon}
          label={nameLib.startQuiz}
          alt={nameLib.startQuiz}
          linkTo="/quizStart"
        />
        {isQuizStarted && !isQuizOver && (
          <NavItem
            icon={ContinueQuizIcon}
            label={nameLib.continueQuiz}
            alt={nameLib.continueQuiz}
            linkTo="/quiz"
          />
        )}
        <NavItem
          icon={QuizHistoryIcon}
          label={nameLib.quizHistory}
          alt={nameLib.quizHistory}
          linkTo="/quizHistory"
        />
        <NavItem
          icon={FlashcardIcon}
          label={nameLib.flashcards}
          alt={nameLib.flashcards}
          linkTo="/flashcardCategories"
        />
        {hasStudentRole(roles) && (
          <NavItem
            icon={StudentGroupIcon}
            label={nameLib.studentCredit}
            alt={nameLib.studentCredit}
            linkTo="/studentCredit"
          />
        )}
        {hasTeacherRole(roles) && (
          <NavItem
            icon={TeacherPanelIcon}
            label={nameLib.teacherPanel}
            alt={nameLib.teacherPanel}
            linkTo="/teacherPanel"
          />
        )}
        {hasAdminRole(roles) && (
          <NavItem
            icon={AdminPanelIcon}
            label={nameLib.adminPanel}
            alt={nameLib.adminPanel}
            linkTo="/adminPanel"
          />
        )}
        <NavItem
          icon={LogoutIcon}
          label={nameLib.logout}
          alt={nameLib.logout}
          linkTo="/login"
          onClick={logoutClickedHandler}
        />
      </div>
    </nav>
  );
};

export default Navbar;
