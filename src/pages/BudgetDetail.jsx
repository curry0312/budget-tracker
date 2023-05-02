import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { budgetsSelector } from "../features/budgetsSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

function BudgetDetail() {
  const budgets = useSelector(budgetsSelector);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  ChartJS.register(ArcElement, Tooltip, Legend);

  function total() {
    const currentYearMonthData = [];
    console.log(budgets.length);
    for (let i = 0; i < budgets.length; i++) {
      if (
        parseFloat(budgets[i].date.split("-")[0]) === year &&
        parseFloat(budgets[i].date.split("-")[1]) === month
      ) {
        currentYearMonthData.push(budgets[i]);
      }
    }
    console.log(currentYearMonthData);
    const eachCategoryTotalExpense = [];
    for (let i = 0; i < currentYearMonthData.length; i++) {
      console.log("i =",i)
      console.log("eachCategoryTotalExpense.length =", eachCategoryTotalExpense.length);
      for (let j = 0; j === 0 || j < eachCategoryTotalExpense.length; j++) {
        console.log("j =",j)
        console.log("-------------------")
        if (eachCategoryTotalExpense.length == 0) {
          eachCategoryTotalExpense.push({
            category: currentYearMonthData[i].category,
            price: parseFloat(currentYearMonthData[i].price),
          });
          break
        } 
        else if (
          eachCategoryTotalExpense[j].category ===
          currentYearMonthData[i].category
        ) {
          eachCategoryTotalExpense[j].price =
            parseFloat(eachCategoryTotalExpense[j].price) +
            parseFloat(currentYearMonthData[i].price);
          break
        } 
        else if (
          j === eachCategoryTotalExpense.length - 1
        ) {
          eachCategoryTotalExpense.push({
            category:currentYearMonthData[i].category,
            price:parseFloat(currentYearMonthData[i].price)
          })
          break
        } 
        else {
          continue;
        }
      }
    }
    return eachCategoryTotalExpense;
  }

  const data = total();
  console.log(data);

  return (
    <div className="sm:ml-[200px] p-4">
      {/*date*/}
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
      <div>{/* <Pie data={data}/> */}</div>
    </div>
  );
}

export default BudgetDetail;
