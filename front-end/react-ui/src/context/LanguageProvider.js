import React, { createContext } from "react";
import useLanguageSwitch from "../hooks/useLanguageSwitch";
import { LANGUAGE_CONFIG } from "../utils/language-utils/language-config";

const LanguageContext = createContext({});

export const LanguageProvider = ({ children }) => {
  const { setLanguage, nameLib } = useLanguageSwitch(LANGUAGE_CONFIG);

  console.log("language: ", nameLib);

  return (
    <LanguageContext.Provider value={{ setLanguage, nameLib }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
