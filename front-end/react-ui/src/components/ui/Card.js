import React from "react";

const Card = ({ children, topPadding, customHeight = "medium" }) => {
  const topPaddingCustom = topPadding ? `pt-${topPadding}` : `pt-12`;
  let height = "h-[34rem]";
  if (customHeight === "small") {
    height = "h-[24rem]";
  }
  if (customHeight === "medium") {
    height = "h-[34rem]";
  }
  if (customHeight === "large") {
    height = "h-[44rem]";
  }

  return (
    <section
      className={`flex  justify-center ${topPaddingCustom} ${height} mx-auto`}
    >
      {children}
    </section>
  );
};

export default Card;
