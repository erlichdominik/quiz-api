import React from "react";

import useLanguageContext from "../../hooks/useLanguageContext";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import USER_ROLES from "../../utils/roles/authRoles";
import useAuth from "../../hooks/useAuth";
import usePdfDownloader from "../../hooks/usePdfDownloader";
import {nameLibPolish as nameLib} from "../../utils/language-utils/language-config";

const hasStudentRole = (roles) => roles.includes(USER_ROLES.regularUser);

const hasTeacherRole = (roles) => roles.includes(USER_ROLES.teacherUser);

const hasAdminRole = (roles) => roles.includes(USER_ROLES.adminUser);

const GET_PDF_URL = () => `/teacher/manual`;

const Tutorial = () => {
  const { language } = useLanguageContext();
  const { auth } = useAuth();
  const roles = auth.roles;
  const { loadPdfFile } = usePdfDownloader();

  const handleDownloadManual = () => {
    loadPdfFile(GET_PDF_URL());
  }

  const studentPolishDesc = (
    <>
      <h1 className="text-2xl mt-2">Informacje dla użytkownika:</h1>
      <div className="text-start text-sm mx-auto w-2/3 overflow-auto">
        <p className="block text-start space leading-relaxed">
          Aplikacja zawiera pytania dotyczące odruchowej kontroli średniego
          ciśnienia tętniczego (MAP).
          <br />
          Pytania zostały podzielone tematycznie na trzy części - ścieżki, które
          dotyczą naczyń, komórek roboczych komór serca oraz układu
          bodźcoprzewodzącego.
          <br />
          <strong> Quiz -</strong> Wybór ikony „Rozpocznij Quiz” rozpoczyna
          test, w trakcie którego losowo zostaną wybrane ścieżki.
          <br />
          Jeżeli jako student jesteś zapisany do zaliczenia, przysługuje ci 5
          prób podejścia do Quizu. Po wykorzystaniu wszystkich prób wciąż możesz
          podchodzić do Quizu, ale twoje wyniki nie będą zapisane u nauczyciela
          <br />
          Jeżeli odpowiesz nieprawidłowo na pytanie, wówczas otrzymujesz zestaw
          pytań z kolejnej ścieżki. Na końcu gry zobaczysz wyniki osobno dla
          każdej ze ścieżek. Test musisz przejść zawsze do końca.
          <br />
          <strong> Kontynuuj quiz –</strong> ikona pojawia się po rozpoczęciu
          testu. Umożliwia kontynuowanie przerwanej gry.
          <br />
          <strong>Historia quizów</strong> – tu znajdziesz informacje o
          zakończonych quizach
          <br />
          <strong>Fiszki –</strong> zostały przygotowane celem powtórzenia pojęć
          i terminów. Możesz wybrać dowolną kategorię fiszek.
          <br />
          Po kliknięciu na fiszkę możesz przejść do kolejnej. Na końcu
          informację o zakończeniu wybranej serii fiszek.
          <br />
          <strong>Zaliczenie –</strong> w tym miejscu musisz wpisać kod grupy,
          który otrzymasz od nauczyciela prowadzącego w emailu.
          <br />
          Zwróć uwagę na termin zakończenia testu, który zostanie podany w
          emailu.
          <br />
          Po tym czasie będziesz mógł rozwiązywać quiz, ale nie możesz już
          wykonać zaliczenia.
          <br />
          <strong>Wyloguj się –</strong> pamiętaj o zamknięciu aplikacji, gdy
          przestaniesz z niej korzystać.
        </p>
      </div>
    </>
  );

  const studentEnglishDesc = (
    <>
      <h1 className="text-2xl mt-2">User information:</h1>
      <div className="text-start text-sm mx-auto w-2/3 overflow-auto">
        <p className="block text-start space leading-relaxed">
          The application contains questions about reflex regulation of mean
          arterial pressure (MAP).
          <br />
          The questions are divided according to the topic into three sections -
          pathways that relate to the vessels, the cardiomyocytes of cardiac
          chambers and the cardiac conduction system.
          <br />
          <strong>Quiz - </strong>Choosing the &#39;Start Quiz&#39; icon starts
          the test, during which pathways will be randomly selected. If you
          answer a question incorrectly, you will be given a set of questions
          from the following path.
          <br />
          When you are assigned to a credit (group) you have 5 attempts at the
          Quiz. After completing those 5 attempts you may still solve the Quiz,
          but your score will not be sent to the teacher
          <br />
          At the end of the game, you will see the results for each path
          separately. You must always pass the test to the end.
          <br />
          <strong>Continue quiz - </strong>this icon appears when you start a
          test. It allows you to continue an interrupted game.
          <br />
          <strong>Quiz history - </strong>here, you will find information about
          completed quizzes.
          <br />
          <strong>Flashcards - </strong>these are designed to help you revise
          terms and concepts. You can choose any category of flashcards. You can
          move on to the next card by clicking on the card. In the end, you will
          see information about the completion of the selected series of
          flashcards.
          <br />
          <strong>Credit - </strong>this is where you need to enter the group
          code, which you will receive from your tutor in an email. Pay
          attention to the end date of the test, which will be stated in the
          email. After this time, you can no longer complete the credit.
          <br />
          <strong>Log out - </strong>remember to exit the app when you stop
          using it.
        </p>
      </div>
    </>
  );

  const polishDesc = (
    <>
      <h1 className="text-2xl mt-2">
        Krótka instrukcja obsługi dla nauczycieli i administratorów
      </h1>
      <div className="text-start text-sm mx-auto w-2/3 overflow-auto">
        <p clasName="block text-start">
          <br />
          Użytkownik nawiguje w aplikacji używając dolnego panelu.
          <br />
          Oto jego poszczególne funkcje:
          <br />
          <strong>Rozpocznij quiz - </strong>Rozpoczyna nowy quiz. (tylko
          Nauczyciel i Student)
          <br />
          <strong>Kontynuuj quiz - </strong>Umożliwia kontynuacje quizu.(dopiero
          gdy użytkownik ma rozpoczęty quiz)
          <br />
          <strong>Historia quizów - </strong>Pokazuje historię quizów, lub
          informacje, gdy użytkownik nie ukończył jszcze żadnego quizu
          <br />
          <strong>Fiszki - </strong>Umożliwia korzystanie z fiszek, po
          kliknięciu jesteśmy skierowani na kategorie fiszek (można scrollować)
          i po kliknięciu w kategorię przeglądamy fiszki klikając na nie, dopóki
          się nie wyczerpią
          <br />
          W tym elemencie pokazują się fukcjonalności w zależności od naszej
          roli
          <br />
          <strong>Nauczyciel - </strong>Panel nauczyciela - Mamy dwie opcje -
          <strong> Grupy </strong>oraz <strong>Stwórz grupę</strong>. <br />
          <strong>Grupy</strong> umożliwiają nam zarządzanie grupami. <br />
          <strong>Stwórz grupę </strong>umożliwia nam utworzenie grupy i
          otrzymanie jej kodu
          <br />
          <strong>Admin - </strong>Panel Administratora - Mamy trzy opcje -
          Lista grup, Stwórz nauczyciela, Wszyscy użytkownicy.
          <br />
          <strong>Lista grup - </strong>Administrator ma wgląd do grup na tym
          samym poziomie co nauczyciel i może zarządzać grupami wszystkich
          nauczycieli
          <br />
          <strong>Stwórz nauczyciela - </strong>Tutaj możemy stworzyć
          nauczyciela (nie jest to dostępne z poziomu rejestracji)
          <br />
          <strong>Wszyscy użytkownicy - </strong>Jako administrator mamy wgląd
          do wszystkich użytkowników i możemy ich usuwać
          <br />
          <strong>Wyloguj się - </strong>opcja do wylogowywania
          <br />
        </p>
        <button
              className="border border-darkcl px-3 py-1 rounded-xl text-sm w-[12rem] hover:bg-secondaryblue hover:text-white transition"
              onClick={handleDownloadManual}
            >
              {nameLib.downloadManual}
            </button>
      </div>
    </>
  );

  const englishDesc = (
    <>
      <h1 className="text-2xl mt-2">
        Short manual for the admins and teachers:
      </h1>
      <div className="text-start text-sm mx-auto w-2/3 overflow-auto">
        <p clasName="block text-start">
          <br />
          User navigates through the application via the bottom panel
          <br />
          Here are it's functions:
          <br />
          <strong>Start quiz - </strong>starts new quiz (teacher and student
          only)
          <br />
          <strong>Continue quiz -</strong> enables the user to continue the quiz
          (only if the user has a quiz in progress)
          <br />
          <strong>QuizHistory -</strong> Shows the quiz history, or the
          information if the user does not have any quizzes completed
          <br />
          <strong>Flashcards -</strong> Enables the user to access the
          flashcards, after clicking the user is redirected to (scrollable)
          flashcards categories view, after clicking the category the user click
          on the flashcard to progress until they are depleted
          <br />
          <strong>Teacher - </strong>Teacher panel - Here we have two options -
          &nbsp;
          <strong>Group </strong>and <strong>Create Group</strong>
          <br />
          <strong>Group </strong>enables us to manage the group and it's
          students
          <br />
          <strong>Create group </strong>enables us to create a new group and
          view it's code
          <br />
          <strong>Admin - </strong>Admin panel - Here we have three options -
          Groups list, create teacher, All users
          <br />
          <strong>Groups List - </strong>Here the Admin can manage and inspect
          groups created by all of the teachers <br />
          <strong>Create Teacher -</strong> Here the Admin can create a new
          teacher
          <br />
          <strong>All users -</strong> As an Administrator we have access to
          view all of the users and delete them
          <br />
          <strong>Logout -</strong> A logout option
          <br />
        </p>
        <button
            className="border border-darkcl px-3 py-1 rounded-xl text-sm w-[12rem] hover:bg-secondaryblue hover:text-white transition"
            onClick={handleDownloadManual}
        >
          {nameLib.downloadManual}
        </button>
      </div>
    </>
  );

  let description;

  if (language === "POLISH") {
    if (hasStudentRole(roles)) {
      description = studentPolishDesc;
    } else {
      description = polishDesc;
    }
  } else if (language === "ENGLISH") {
    if (hasStudentRole(roles)) {
      description = studentEnglishDesc;
    } else {
      description = englishDesc;
    }
  }

  return (
    <BackgroundWrapper>
      <Card>
        <div className="bg-white border border-primaryblue rounded-lg shadow flex flex-col space-y-2 text-center w-4/5">
          {description}
        </div>
      </Card>
      <Navbar></Navbar>
    </BackgroundWrapper>
  );
};

export default Tutorial;
