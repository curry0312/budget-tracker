import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { budgetsSelector } from "../features/budgetsSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { currency } from "../util/currency";
import { getAppointYearMonthBudgets } from "../logic/getAppointYearMonth/getAppointYearMonthBudgets";
import { getSplitLabelsAndPrices } from "../logic/getSplitLabelsAndPrices";
import { getAppointYearMonthTotalPrice } from "../logic/getAppointYearMonth/getAppointYearMonthTotalPrice";
import { getPerBudgetAverageComparison } from "../logic/getComparison/getPerBudgetAverageComparison";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { getPerDayAverageComparison } from "../logic/getComparison/getPerDayAverageComparison";

function BudgetDetail() {
  const budgets = useSelector(budgetsSelector);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const filteredCurrentYearMonthData = getAppointYearMonthBudgets(
    budgets,
    year,
    month
  );
  const filteredPreviousYearMonthData = getAppointYearMonthBudgets(
    budgets,
    year,
    month - 1
  );

  const [labels, prices] = getSplitLabelsAndPrices(
    filteredCurrentYearMonthData
  );

  const currentTotalPrice = getAppointYearMonthTotalPrice(
    filteredCurrentYearMonthData
  );
  const previousTotalPrice = getAppointYearMonthTotalPrice(
    filteredPreviousYearMonthData
  );

  const perBudgetAverageComparison = getPerBudgetAverageComparison(
    currentTotalPrice,
    filteredCurrentYearMonthData,
    previousTotalPrice,
    filteredPreviousYearMonthData
  );
  const perDayAverageComparison = getPerDayAverageComparison(
    currentTotalPrice,
    previousTotalPrice
  );

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
          {/*Category information*/}
          <div className="flex justify-center items-center gap-5">
            {filteredCurrentYearMonthData.map((e, index) => {
              return (
                <div key={index} className="font-Tilt">
                  <div className="text-blue-400 text-2xl">{e.category}</div>
                  <div className="text-red-600 text-md">
                    {currency.format(e.price)}
                  </div>
                  <div>
                    {((parseFloat(e.price) / currentTotalPrice) * 100).toFixed(
                      1
                    )}
                    %
                  </div>
                </div>
              );
            })}
          </div>
          {/*Pie chart*/}
          <div className="flex justify-center py-5 flex-1">
            <div>
              <Pie data={data} />
            </div>
          </div>
          <div>
            {/*Per budget average*/}
            <div className="flex items-center gap-1">
              <div className="text-2xl text-blue-400 font-Tilt">
                Per budget average{" "}
                <span className="text-sm">(compare with last month)</span>:
              </div>
              <div className="text-md text-black font-Tilt text-2xl">
                {currency.format(
                  currentTotalPrice /
                    parseFloat(filteredCurrentYearMonthData.length)
                )}
              </div>
              <div
                className={
                  perBudgetAverageComparison > 0
                    ? "text-red-600 flex items-center"
                    : "text-green-500 flex items-center"
                }
              >
                (
                {perBudgetAverageComparison > 0 && (
                  <KeyboardDoubleArrowUpIcon />
                )}
                {perBudgetAverageComparison < 0 && (
                  <KeyboardDoubleArrowDownIcon />
                )}
                <p>{perBudgetAverageComparison}</p>
                <p>%</p>)
              </div>
            </div>
            {/*Per day budgets*/}
            <div className="flex items-center gap-1">
              <div className="text-2xl text-blue-400 font-Tilt">
                Per day average:
              </div>
              <div className="font-Tilt text-2xl">
                {currency.format(currentTotalPrice / new Date().getDate())}
              </div>
              <div
                className={
                  perBudgetAverageComparison > 0
                    ? "text-red-600 flex items-center"
                    : "text-green-500 flex items-center"
                }
              >
                (
                {perBudgetAverageComparison > 0 && (
                  <KeyboardDoubleArrowUpIcon />
                )}
                {perBudgetAverageComparison < 0 && (
                  <KeyboardDoubleArrowDownIcon />
                )}
                <p>{perBudgetAverageComparison}</p>
                <p>%</p>
                )
              </div>
            </div>
            {/*budgets quantities*/}
            <div className="flex items-center gap-1">
              <div className="text-2xl text-blue-400 font-Tilt">
                Budgets quantitues:
              </div>
              <div className="font-Tilt text-2xl">
                {filteredCurrentYearMonthData.length}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BudgetDetail;
