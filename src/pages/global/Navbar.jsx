import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarRoute from "../../components/NavbarRoute";

function Navbar({isMenuOpen, setIsMenuOpen}) {
  return (
    <nav className="flex items-center bg-lightblue-sky h-[70px] px-2">
      {/*logo*/}
      <div aria-label="logo">
        <h1 className="text-white font-Tilt text-2xl">BudgetTracker</h1>
      </div>
      {/*routes*/}
      <div className="ml-auto font-Neucha hidden gap-2 sm:flex">
        <NavbarRoute title="Setting" Icon={<SettingsIcon />} />
        <NavbarRoute title="Login" Icon={<LoginIcon />} />
        <NavbarRoute title="Register" Icon={<PersonIcon />} />
      </div>
      {/*sm:hamburger*/}
      <div onClick={()=>setIsMenuOpen(!isMenuOpen)} className="text-white ml-auto sm:hidden">
        <MenuIcon />
      </div>
    </nav>
  );
}

export default Navbar;
