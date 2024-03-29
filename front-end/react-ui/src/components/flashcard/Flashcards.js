import React, { useState } from "react";
import Flashcard from "./Flashcard";
import useLanguageContext from "../../hooks/useLanguageContext";

const Flashcards = ({ flashcards, onReturnClick, isLoading }) => {
  const { nameLib } = useLanguageContext();
  const [flashcardCounter, setFlashcardCounter] = useState(0);
  const [isFlashcardFinished, setIsFlashcardFinished] = useState(false);

  const handleFlashcardClick = () => {
    if (flashcardCounter < flashcards.length - 1) {
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
    <div className="flex flex-col w-[20rem] h-full">
      <button
        className="bg-secondaryblue h-10 text-white w-full text-sm border border-white shadow rounded-lg px-2 py-1  mb-1"
        onClick={() => onReturnClick(false)}
      >
        {nameLib.goBackToCatSelection}
      </button>
      {isLoading && (
        <p className="text-lg text-center text-white">{nameLib.loading}</p>
      )}
      {flashcards.length === 0 && !isLoading ? (
        <p className="text-lg text-center text-white">
          {nameLib.flashcardCategoryEmpty}
        </p>
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
