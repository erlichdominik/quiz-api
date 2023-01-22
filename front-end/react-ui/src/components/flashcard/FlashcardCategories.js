import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Navbar from "../ui/Navbar";
import FlashcardCategoriesTable from "./FlashcardCategoriesTable";
import Flashcards from "./Flashcards";
import useLanguageContext from "../../hooks/useLanguageContext";

const FLASHCARD_CATEGORY_URL = "/flashcards";

const FlashcardCategories = () => {
  const axiosPrivate = useAxiosPrivate();

  const { setCanChangeLocale, language, nameLib } = useLanguageContext();

  const [flashcardCategories, setFlashcardCategories] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  const getFlashcardCategoryData = async () => {
    // na koncu language
    const languageReq = language === "POLISH" ? "PL" : "EN";
    const response = await axiosPrivate.get(FLASHCARD_CATEGORY_URL, {
      params: { locale: languageReq },
    });
    setFlashcardCategories(response.data);
  };

  const getFlashcardsData = async (categoryId) => {
    console.log("Getting flashcards with id: ", categoryId);
    const response = await axiosPrivate.get(
      `${FLASHCARD_CATEGORY_URL}/${categoryId}`
    );
    setFlashcards(response.data);
  };

  const handleCategoryClick = (categoryId) => {
    console.log("Handling category click with category ", categoryId);
    setSelectedCategory(categoryId);
    setIsCategorySelected(true);
    getFlashcardsData(categoryId);
  };

  const handleReturnClick = (categorySelected) => {
    setIsCategorySelected(categorySelected);
  };

  useEffect(() => {
    getFlashcardCategoryData();
  }, [language]);

  useEffect(() => {
    setCanChangeLocale(!isCategorySelected);
  }, [isCategorySelected]);

  const renderTitle = () =>
    isCategorySelected ? nameLib.flashcards : nameLib.flashcardCategories;

  return (
    <>
      <main className="bg-secondaryblue h-screen w-screen">
        <h1 className="text-2xl text-white pt-3 w-fit mx-auto">
          {renderTitle()}
        </h1>
        {isCategorySelected && (
          <h2 className="text-xl text-white pt-3 w-fit mx-auto">
            {nameLib.flashcardCategories} &nbsp;
            {
              flashcardCategories.find((cat) => cat.id === selectedCategory)
                .category
            }
          </h2>
        )}
        <section className="h-4/5 flex justify-center items-center mx-2">
          {!isCategorySelected ? (
            <div className="flex justify-center items-center w-full h-5/6">
              <FlashcardCategoriesTable
                flashcardCategories={flashcardCategories}
                onCategoryClick={handleCategoryClick}
              />
            </div>
          ) : (
            <Flashcards
              flashcards={flashcards}
              onReturnClick={handleReturnClick}
            />
          )}
        </section>
      </main>
      <Navbar />
    </>
  );
};

export default FlashcardCategories;
