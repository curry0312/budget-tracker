import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { budgetsSelector } from "../features/budgetsSlice";

function BudgetDetail() {
  const budgets = useSelector(budgetsSelector)
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  

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
    </div>
  );
}

export default BudgetDetail;
