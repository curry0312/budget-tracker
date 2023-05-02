import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { budgetsSelector } from "../features/budgetsSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { currency } from "../util/currency";
import { getCurrentYearMonthBudgets } from "../logic/getCurrentYearMonthBudgets";
import { getSplitLabelsAndPrices } from "../logic/getSplitLabelsAndPrices";

function BudgetDetail() {
  const budgets = useSelector(budgetsSelector);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const filteredCurrentYearMonthData = getCurrentYearMonthBudgets(budgets,year,month);
  
  const [labels, prices] = getSplitLabelsAndPrices(filteredCurrentYearMonthData);

  const totalPrice = filteredCurrentYearMonthData.reduce((total, e) => {
    return (total = total + parseFloat(e.price));
  }, 0);
  
  /*Chart Library*/
  ChartJS.register(ArcElement, Tooltip, Legend);
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
      {filteredCurrentYearMonthData.length === 0 ? (
        <div className="text-red-800 text-3xl font-Tilt">
          No Current Year And Month Budget!
        </div>
      ) : (
        <>
          <div className="flex gap-5">
            {filteredCurrentYearMonthData.map((e, index) => {
              return (
                <div key={index} className="font-Tilt">
                  <div className="text-blue-400 text-2xl">{e.category}</div>
                  <div className="text-red-600 text-md">{currency.format(e.price)}</div>
                  <div>
                    {((parseFloat(e.price) / totalPrice) * 100).toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center py-5 flex-1">
            <div>
              <Pie data={data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BudgetDetail;
