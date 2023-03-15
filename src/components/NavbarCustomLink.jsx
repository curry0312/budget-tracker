import React from "react";
import { Link } from "react-router-dom";

function NavbarCustomLink({title,Icon,to}) {
  return (
    <Link to={to} className="text-white font-Neucha flex cursor-pointer">
      <div>
        {Icon}
      </div>
      <p>{title}</p>
    </Link>
  );
}

export default NavbarCustomLink;
