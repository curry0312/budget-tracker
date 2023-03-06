import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import AddNewBudget from "./pages/AddNewBudget"
import AddNewCategory from "./pages/AddNewCategory"
import BudgetDetail from "./pages/BudgetDetail"
import EditBudget from "./pages/EditBudget"
import Navbar from "./pages/global/Navbar"
import Sidebar from "./pages/global/Sidebar"
import Home from "./pages/Home"


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  return (
    <div className=".app">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <Sidebar isMenuOpen={isMenuOpen}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/budgetdetail" element={<BudgetDetail />}/>
        <Route path="/addnewbudget" element={<AddNewBudget />}/>
        <Route path="/addnewcategory" element={<AddNewCategory />}/>
        <Route path="/editbudget/:id" element={<EditBudget />}/>
      </Routes>
    </div>
  )
}

export default App
