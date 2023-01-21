import React, { useEffect, useState } from "react";

const useLanguageSwitch = () => {
  const [language, setLanguage] = useState();
  const [nameLib, setNameLib] = useState();

  useEffect(() => {}, [language]);

  return { setLanguage, nameLib };
};

export default useLanguageSwitch;
