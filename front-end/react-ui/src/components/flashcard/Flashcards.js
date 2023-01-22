import React, { useState } from "react";
import Flashcard from "./Flashcard";
import useLanguageContext from "../../hooks/useLanguageContext";

const Flashcards = ({ flashcards, onReturnClick }) => {
  const { nameLib } = useLanguageContext();
  const [flashcardCounter, setFlashcardCounter] = useState(0);
  const [isFlashcardFinished, setIsFlashcardFinished] = useState(false);
  console.log("flashcards", flashcards);

  const handleFlashcardClick = () => {
    if (flashcardCounter < flashcards.length - 1) {
      console.log("flashcard clicked");
      setFlashcardCounter((prev) => prev + 1);
    } else {
      setIsFlashcardFinished(true);
    }
  };

  const handleResetClick = () => {
    setFlashcardCounter(0);
    setIsFlashcardFinished(false);
  };

  return (
    <div className="flex flex-col w-3/4 ">
      <button
        className="bg-secondaryblue h-10 text-white w-full text-sm border border-white shadow rounded-lg px-2 py-1  mb-1"
        onClick={() => onReturnClick(false)}
      >
        {nameLib.goBackToCatSelection}
      </button>
      {flashcards.length === 0 ? (
        <p>{nameLib.flashcardCategoryEmpty}</p>
      ) : (
        <Flashcard
          text={flashcards[flashcardCounter]?.text}
          description={flashcards[flashcardCounter]?.description}
          onClick={handleFlashcardClick}
          isFinished={isFlashcardFinished}
          onResetClick={handleResetClick}
        />
      )}
    </div>
  );
};

export default Flashcards;
