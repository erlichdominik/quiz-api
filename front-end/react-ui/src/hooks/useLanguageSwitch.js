import { useEffect, useState } from "react";

const useLanguageSwitch = (LANGUAGE_CONFIG) => {
  const [language, setLanguage] = useState("ENGLISH");
  const [nameLib, setNameLib] = useState(
    LANGUAGE_CONFIG.availableLanguages.english
  );

  useEffect(() => {
    if (language === "POLISH") {
      setNameLib(LANGUAGE_CONFIG.availableLanguages.polish);
    } else if (language === "ENGLISH") {
      setNameLib(LANGUAGE_CONFIG.availableLanguages.english);
    }
  }, [language]);

  return { setLanguage, nameLib };
};

export default useLanguageSwitch;
