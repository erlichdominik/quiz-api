import React from "react";

const Card = ({ children, topPadding, customHeight = "medium" }) => {
  const topPaddingCustom = topPadding ? `pt-${topPadding}` : `pt-12`;
  const height = () => {
    if (customHeight === "small") {
      return "h-[24rem]";
    }
    if (customHeight === "medium") {
      return "h-[34rem]";
    }
    if (customHeight === "large") {
      return "h-[44rem]";
    }
    return "h-[34rem]";
  };

  return (
    <section
      className={`flex  justify-center ${topPaddingCustom} ${height()} `}
    >
      {children}
    </section>
  );
};

export default Card;
