import { useContext } from "react";
import LanguageContext from "../context/LanguageProvider";

const useLanguageContext = () => {
  return useContext(LanguageContext);
};

export default useLanguageContext;
