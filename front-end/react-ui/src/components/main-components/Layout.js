import { Outlet } from "react-router-dom";
import LanguageSwitch from "../language/LanguageSwitch";

const Layout = () => {
  return (
    <>
      <LanguageSwitch />
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
