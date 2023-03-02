import React from "react";

function NavbarRoute({title,Icon}) {
  return (
    <div className="text-white font-Neucha flex gap-2 cursor-pointer">
      <div>
        {Icon}
      </div>
      <p>{title}</p>
    </div>
  );
}

export default NavbarRoute;
