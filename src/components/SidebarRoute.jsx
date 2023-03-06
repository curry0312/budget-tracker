import React from "react";
import { useNavigate } from "react-router-dom";

function SidebarRoute({ title, Icon, isNavigate, setIsNavigate, href }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => {
        setIsNavigate((current) => (current = title))
        navigate(`${href}`)
      }}
      className={
        isNavigate === title
          ? `flex items-center my-1 text-white font-Neucha gap-2 px-1 cursor-pointer rounded-full bg-blue-300 hover:bg-blue-300`
          : `flex items-center my-1 text-white font-Neucha gap-2 px-1 cursor-pointer rounded-full hover:bg-blue-300`
      }
    >
      <div>{Icon}</div>
      <p>{title}</p>
    </div>
  );
}

export default SidebarRoute;
