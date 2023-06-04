import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarCustomLink from "../../components/NavbarCustomLink";
import { useNavigate } from "react-router-dom";

function Navbar({isMenuOpen, setIsMenuOpen}) {
  const navigate = useNavigate()
  return (
    <nav className="flex items-center bg-lightblue-sky h-[70px] px-2">
      {/*logo*/}
      <div onClick={()=>navigate("/")} aria-label="logo">
        <h1 className="text-white font-Tilt text-2xl cursor-pointer">BudgetTracker</h1>
      </div>
      {/*routes*/}
      <div className="ml-auto font-Neucha hidden gap-2 sm:flex">
        {/* <NavbarCustomLink to="/setting" title="Setting" Icon={<SettingsIcon />} />
        <NavbarCustomLink to="/login" title="Login" Icon={<LoginIcon />} />
        <NavbarCustomLink to="/signup" title="Signup" Icon={<PersonIcon />} /> */}
      </div>
      {/*sm:hamburger*/}
      <div onClick={()=>setIsMenuOpen(!isMenuOpen)} className="text-white ml-auto sm:hidden">
        <MenuIcon />
      </div>
    </nav>
  );
}

export default Navbar;
