import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ icon, label, linkPath, onClick }) => {
  return (
    <Link to={linkPath}>
      <div
        className="inline-block w-full transition bg-white hover:bg-darkcl hover:text-white"
        onClick={onClick}
      >
        <div className="w-16 h-16"></div>
        <div className="block">{label}</div>
      </div>
    </Link>
  );
};

export default NavItem;
