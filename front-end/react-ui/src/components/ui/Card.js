import React from "react";

const Card = ({ children }) => {
  return (
    <section className="flex items-center justify-center h-4/5 w-full">
      {children}
    </section>
  );
};

export default Card;
