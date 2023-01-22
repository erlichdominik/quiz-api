import React, { createContext, useState } from "react";
import useLanguageSwitch from "../hooks/useLanguageSwitch";
import { LANGUAGE_CONFIG } from "../utils/language-utils/language-config";

const LanguageContext = createContext({});

export const LanguageProvider = ({ children }) => {
  const { language, setLanguage, nameLib } = useLanguageSwitch(LANGUAGE_CONFIG);
  const [canChangeLocale, setCanChangeLocale] = useState(true);

  console.log("language: ", nameLib);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        nameLib,
        canChangeLocale,
        setCanChangeLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
