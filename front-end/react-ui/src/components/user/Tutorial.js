import React from "react";

import useLanguageContext from "../../hooks/useLanguageContext";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";

const Tutorial = () => {
  const { language, nameLib } = useLanguageContext();

  const polishDesc = (
    <>
      <h1 className="text-2xl mt-2">
        Krótka instrukcja obsługiwania dla użytkownika:
      </h1>
      <h2 className="text-xl"> Podstawowe instrukcje:</h2>
      <div className="text-start text-sm mx-auto w-2/3">
        <p clasName="block text-start">
          <br />
          Użytkownik nawiguje w aplikacji używając dolnego panelu.
          <br />
          Oto jego poszczególne funkcje:
          <br />
          Rozpocznij quiz - Rozpoczyna nowy quiz.
          <br />
          Kontynuuj quiz - Umożliwia kontynuacje quizu.(dopiero gdy użytkownik
          ma rozpoczęty quiz)
          <br />
          Historia quizów - Pokazuje historię quizów, lub informacje, gdy
          użytkownik nie ukończył jszcze żadnego quizu
          <br />
          Fiszki - Umożliwia korzystanie z fiszek, po kliknięciu jesteśmy
          skierowani na kategorie fiszek (można scrollować) i po kliknięciu w
          kategorię przeglądamy fiszki klikając na nie, dopóki się nie wyczerpią
          <br />
          W tym elemencie pokazują się fukcjonalności w zależności od naszej
          roli
          <br />
          Student - Zaliczenie - Tutaj można dodać kod grupy do której chcemy
          dołączyć
          <br />
          Nauczyciel - Panel nauczyciela - Mamy dwie opcje - Grupy oraz Stwórz
          grupę. Grupy umożliwiają nam zarządzanie grupami, a Stwórz grupę
          umożliwia nam utworzenie grupy i otrzymanie jej kodu
          <br />
          Admin - Panel Administratora - Mamy trzy opcje - Lista grup, Stwórz
          nauczyciela, Wszyscy użytkownicy.
          <br />
          Lista grup - Administrator ma wgląd do grup na tym samym poziomie co
          nauczyciel i może zarządzać grupami wszystkich nauczycieli
          <br />
          Stwórz nauczyciela - Tutaj możemy stworzyć nauczyciela (nie jest to
          dostępne z poziomu rejestracji)
          <br />
          Wszyscy użytkownicy - Jako administrator mamy wgląd do wszystkich
          użytkowników i możemy ich usuwać
          <br />
          Wyloguj się - opcja do wylogowywania
          <br />
        </p>
      </div>
    </>
  );

  const englishDesc = (
    <>
      <h1 className="text-2xl mt-2">Short manual for the user:</h1>
      <h2 className="text-xl">Basic functionalities:</h2>
      <div className="text-start text-sm mx-auto w-2/3">
        <p clasName="block text-start">
          <br />
          User navigates through the application via the bottom panel
          <br />
          Here are it's functions:
          <br />
          Start quiz - starts new quiz
          <br />
          Continue quiz - enables the user to continue the quiz (only if the
          user has a quiz in progress)
          <br />
          QuizHistory - Shows the quiz history, or the information if the user
          does not have any quizzes completed
          <br />
          Flashcards - Enables the user to access the flashcards, after clicking
          the user is redirected to (scrollable) flashcards categories view,
          after clicking the category the user click on the flashcard to
          progress until they are depleted
          <br />
          In this element the functionality will depend on the role of the user
          <br />
          Student - Credit - Here we can input the code of the group that we
          want to join
          <br />
          Teacher - Teacher panel - Here we have two options - Group and Create
          Group
          <br />
          Group enables us to manage the group and it's students
          <br />
          Create group enables us to create a new group and view it's code
          <br />
          Admin - Admin panel - Here we have three options - Groups list, create
          teacher, All users
          <br />
          Groups List - Here the Admin can manage and inspect groups created by
          all of the teachers <br />
          Create Teacher - Here the Admin can create a new teacher
          <br />
          All users - As an Administrator we have access to view all of the
          users and delete them
          <br />
          Logout - A logout option
          <br />
        </p>
      </div>
    </>
  );

  return (
    <BackgroundWrapper>
      <Card>
        <div className="bg-white border border-primaryblue rounded-lg shadow flex flex-col space-y-2 text-center w-4/5">
          {language === "POLISH" ? polishDesc : englishDesc}
        </div>
      </Card>
      <Navbar></Navbar>
    </BackgroundWrapper>
  );
};

export default Tutorial;
