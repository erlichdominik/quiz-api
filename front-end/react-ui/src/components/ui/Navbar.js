import React from "react";
<<<<<<< HEAD
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useQuizContext from "../../hooks/useQuizContext";
import useLanguageContext from "../../hooks/useLanguageContext";
=======
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useQuizContext from "../../hooks/useQuizContext";
>>>>>>> 74faa1b (add all)
import NavItem from "./NavItem";
import StartQuizIcon from "../../assets/start-quiz.svg";
import ContinueQuizIcon from "../../assets/continue-quiz.svg";
import QuizHistoryIcon from "../../assets/quiz-history.svg";
import LogoutIcon from "../../assets/logout.svg";
import FlashcardIcon from "../../assets/flashcards.svg";
<<<<<<< HEAD
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
=======
import { ReactComponent as LogoutIconTest } from "../../assets/quiz-history.svg";

const Navbar = () => {
  const { isQuizStarted, isQuizOver, disbandQuiz } = useQuizContext();
>>>>>>> 74faa1b (add all)

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
<<<<<<< HEAD
          label={nameLib.startQuiz}
          alt={nameLib.startQuiz}
=======
          label="Start quiz"
          alt="start quiz icon"
>>>>>>> 74faa1b (add all)
          linkTo="/quizStart"
        />
        {isQuizStarted && !isQuizOver && (
          <NavItem
            icon={ContinueQuizIcon}
<<<<<<< HEAD
            label={nameLib.continueQuiz}
            alt={nameLib.continueQuiz}
=======
            label="Continue quiz"
            alt="continue quiz icon"
>>>>>>> 74faa1b (add all)
            linkTo="/quiz"
          />
        )}
        <NavItem
          icon={QuizHistoryIcon}
<<<<<<< HEAD
          label={nameLib.quizHistory}
          alt={nameLib.quizHistory}
=======
          label="Quiz history"
          alt="quiz history icon"
>>>>>>> 74faa1b (add all)
          linkTo="/quizHistory"
        />
        <NavItem
          icon={FlashcardIcon}
<<<<<<< HEAD
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
=======
          label="Flashcards"
          alt="flashcard icon"
          linkTo="/flashcardCategories"
        />
        <NavItem
          icon={LogoutIcon}
          label="Logout"
          alt="logout icon"
>>>>>>> 74faa1b (add all)
          linkTo="/login"
          onClick={logoutClickedHandler}
        />
      </div>
    </nav>
  );
};

export default Navbar;
