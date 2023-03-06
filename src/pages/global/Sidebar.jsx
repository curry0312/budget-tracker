import HomeIcon from "@mui/icons-material/Home";
import PieChartIcon from "@mui/icons-material/PieChart";
import { useState } from "react";
import SidebarRoute from "../../components/SidebarRoute";
function Sidebar({isMenuOpen}) {
  //Control the sidebar navigate bg color
  const [isNavigate, setIsNavigate] = useState('Home')
  return (
    <aside className={isMenuOpen ? `h-screen bg-lightblue-ocean absolute top-[70px] left-0 right-0 overflow-hidden transtion-height duration-300 ease-in-out z-50 sm:bottom-0 sm:left-0 sm:w-[200px]`:`h-0 bg-lightblue-ocean absolute top-[70px] left-0 right-0 overflow-hidden transtion-height duration-300 ease-in-out sm:top-[70px] sm:bottom-0 sm:left-0 sm:w-[200px] sm:h-auto`}>
      <div className="flex flex-col text-white text-2xl my-2 mx-2">
        <SidebarRoute title="Home" Icon={<HomeIcon />} isNavigate={isNavigate} setIsNavigate={setIsNavigate} href="/"/>
        <SidebarRoute title="BudgetDetail" Icon={<PieChartIcon />} isNavigate={isNavigate} setIsNavigate={setIsNavigate} href="budgetdetail"/>
      </div>
    </aside>
  )
}

export default Sidebar
