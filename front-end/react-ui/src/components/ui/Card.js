import React from "react";

const Card = ({ children, topPadding }) => {
  return (
    <section
      className={`flex  justify-center ${
        topPadding ? `pt-${topPadding}` : `pt-12`
      } h-[32rem] w-full`}
    >
      {children}
    </section>
  );
};

export default Card;
