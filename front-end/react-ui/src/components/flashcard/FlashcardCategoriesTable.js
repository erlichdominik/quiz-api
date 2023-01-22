import React from "react";

const FlashcardCategoriesTable = ({ flashcardCategories, onCategoryClick }) => {
  const handleCategoryClick = (categoryId) => {
    onCategoryClick(categoryId);
  };

  return (
    <ul className="bg-white border border-primaryblue w-[20rem] h-full mx-auto rounded-lg flex flex-col items-center text-lg px-2 py-1 overflow-auto">
      {flashcardCategories.map((category) => (
        <li
          className="cursor-pointer hover:bg-secondaryblue hover:text-white px-2 rounded w-full p-1 transition"
          key={category.id}
          id={category.id}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.category}
        </li>
      ))}
    </ul>
  );
};

export default FlashcardCategoriesTable;
