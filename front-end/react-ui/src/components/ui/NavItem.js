import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ icon, label, linkTo, onClick, alt }) => {
  return (
    <div
      className="w-full h-18 text-center pb-1 hover:text-secondaryblue"
      onClick={onClick}
    >
      <Link to={linkTo}>
        <div className="w-12 h-12 mx-auto">
          <img className="object-cover" src={icon} alt={alt} />
        </div>
        <div className="mx-auto max-w-fit">{label}</div>
      </Link>
    </div>
  );
};

export default NavItem;
