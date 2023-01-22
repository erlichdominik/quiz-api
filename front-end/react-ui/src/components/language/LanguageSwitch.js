import React from "react";
import PolandIcon from "../../assets/poland.svg";
import UkIcon from "../../assets/unitedkingdom.svg";
import useLanguageContext from "../../hooks/useLanguageContext";

const LanguageSwitch = () => {
  const { canChangeLocale, setLanguage, nameLib } = useLanguageContext();

  const polandIconClickedHandler = () => {
    if (canChangeLocale) {
      setLanguage("POLISH");
    }
  };
  const ukIconClickedHandler = () => {
    if (canChangeLocale) {
      setLanguage("ENGLISH");
    }
  };

  return (
    <div className="fixed top-0 -inset-x-8 sm:-inset-x-6 w-48 flex justify-evenly -space-x-9">
      <img
        className="w-15 h-9 sm:w-20 sm:h-12 cursor-pointer"
        src={PolandIcon}
        alt="poland flag icon"
        onClick={polandIconClickedHandler}
      />
      <img
        className="w-15 h-9 sm:w-20 sm:h-12 cursor-pointer"
        src={UkIcon}
        alt="uk flag icon"
        onClick={ukIconClickedHandler}
      />
    </div>
  );
};

export default LanguageSwitch;
