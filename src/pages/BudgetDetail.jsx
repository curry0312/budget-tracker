import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { budgetsSelector } from "../features/budgetsSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

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
      console.log("i =", i);
      console.log(
        "eachCategoryTotalExpense.length =",
        eachCategoryTotalExpense.length
      );
      for (let j = 0; j === 0 || j < eachCategoryTotalExpense.length; j++) {
        console.log("j =", j);
        console.log("-------------------");
        if (eachCategoryTotalExpense.length == 0) {
          eachCategoryTotalExpense.push({
            category: currentYearMonthData[i].category,
            price: parseFloat(currentYearMonthData[i].price),
          });
          break;
        } else if (
          eachCategoryTotalExpense[j].category ===
          currentYearMonthData[i].category
        ) {
          eachCategoryTotalExpense[j].price =
            parseFloat(eachCategoryTotalExpense[j].price) +
            parseFloat(currentYearMonthData[i].price);
          break;
        } else if (j === eachCategoryTotalExpense.length - 1) {
          eachCategoryTotalExpense.push({
            category: currentYearMonthData[i].category,
            price: parseFloat(currentYearMonthData[i].price),
          });
          break;
        } else {
          continue;
        }
      }
    }
    return eachCategoryTotalExpense;
  }

  const filteredCurrentYearMonthData = total();
  console.log("filteredCurrentYearMonthData:", filteredCurrentYearMonthData);

  function split() {
    const labels = [];
    const prices = [];
    filteredCurrentYearMonthData.forEach((data) => {
      labels.push(data.category);
      prices.push(data.price);
    });
    return [labels, prices];
  }

  const [labels, prices] = split();

  const data = {
    labels: [...labels],
    datasets: [
      {
        label: "Total",
        data: [...prices],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
      <div className="flex gap-5">
        {filteredCurrentYearMonthData.map((e, index) => {
          return (
            <div key={index} className="font-Tilt">
              <div className="text-blue-400 text-2xl">{e.category}</div>
              <div className="text-red-600 text-md">{e.price}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center py-5 flex-1">
        <div>
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}

export default BudgetDetail;
