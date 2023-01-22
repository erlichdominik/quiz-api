import React from "react";
import PolandIcon from "../../assets/poland.svg";
import UkIcon from "../../assets/unitedkingdom.svg";
import useLanguageContext from "../../hooks/useLanguageContext";

const LanguageSwitch = () => {
  const { setLanguage, nameLib } = useLanguageContext();

  return (
    <div className="fixed top-0 -inset-x-8 sm:-inset-x-6 w-48 flex justify-evenly -space-x-9">
      <img
        className="w-15 h-9 sm:w-20 sm:h-12 cursor-pointer"
        src={PolandIcon}
        alt="poland flag icon"
        onClick={() => setLanguage("POLISH")}
      />
      <img
        className="w-15 h-9 sm:w-20 sm:h-12 cursor-pointer"
        src={UkIcon}
        alt="uk flag icon"
        onClick={() => setLanguage("ENGLISH")}
      />
    </div>
  );
};

export default LanguageSwitch;
