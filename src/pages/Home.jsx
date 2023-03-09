import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeEachBudget from "../components/HomeEachBudget";
import { budgetsSelector } from "../features/budgetsSlice";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
import { daySplit, yearMonthSplit } from "../util/budgetDateSpilt";
import { currency } from "../util/currency";

function Home() {

  const budgets = useSelector(budgetsSelector);
  console.log('budgets',budgets);
  const navigate = useNavigate();

  //set current year and month
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  //set the budgets in that month in correct time sequence
  const copyBudgets = [...budgets]
  const sortedBudgets = copyBudgets.sort((a,b)=>{
    const a_day = daySplit(a.date)
    const b_day = daySplit(b.date)
    return  a_day - b_day
  })
  
  return (
    <section className="sm:ml-[200px] p-4">
      {/*change date*/}
      <div className="flex justify-center items-center gap-3">
        <IconButton
          onClick={() =>
            setMonth((current) => {
              if (current === 1) {
                setYear((current) => current - 1);
                return 12;
              }
              return current - 1;
            })
          }
        >
          <NavigateBeforeIcon />
        </IconButton>
        <div className="text-lightblue-ocean font-Tilt text-3xl">
          <p>
            {year}-{month}
          </p>
        </div>
        <IconButton
          onClick={() =>
            setMonth((current) => {
              if (current === 12) {
                setYear((current) => current + 1);
                return 1;
              }
              return current + 1;
            })
          }
        >
          <NavigateNextIcon />
        </IconButton>
      </div>
      {/*Header*/}
      <div>
        <p className="text-black font-Tilt text-3xl">Budgets:</p>
      </div>
      {/*total expense in that month*/}
      <div className="flex items-center">
        <p className="font-Tilt text-2xl">Current expense in this month:</p>
        <p className="font-Tilt text-xl text-red-500">
        {currency.format(budgets.reduce((total,budget)=>{
          const [budgetYear, budgetMonth] = yearMonthSplit(budget.date);
          if(budgetYear === year && budgetMonth === month) return total = total + parseFloat(budget.price)
          else{
            return total = total + 0
          }
        },0))}
        </p>
      </div>
      {/*render budgets*/}
      <div className="flex flex-col space-y-2 mb-4">
        {sortedBudgets.map((budget, index) => {
          const [budgetYear, budgetMonth] = yearMonthSplit(budget.date);
          if (budgetYear === year && budgetMonth === month) {
            return <HomeEachBudget key={index} budget={budget} />;
          } else {
            null;
          }
        })}
      </div>
      {/*buttons*/}
      <div className="flex space-x-2">
        <button
          onClick={() => navigate("/addnewbudget")}
          className="bg-lightblue-diamond text-white font-Neucha rounded-md px-4 py-2 transition duration-200 ease-in hover:bg-blue-500"
        >
          Add new budget
        </button>
        <button
          onClick={() => navigate("/addnewcategory")}
          className="bg-green-500 text-white font-Neucha rounded-md px-4 py-2 transition duration-200 ease-in hover:bg-green-400"
        >
          Add new category
        </button>
      </div>
    </section>
  );
}

export default Home;
