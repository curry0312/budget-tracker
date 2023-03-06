import React from "react";
import { currency } from "../util/currency";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

function HomeEachBudget({ budget }) {
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="flex justify-between font-Neucha bg-lightblue-ocean text-white p-3 rounded-lg">
        <div>{budget.date}</div>
        <div>{budget.name}</div>
        <div>{budget.category}</div>
        <div>{currency.format(budget.price)}</div>
        <div onClick={()=>navigate(`/editbudget/${budget.id}`)} className="relative flex justify-center items-center cursor-pointer group">
          <EditIcon sx={{}}/>
          <div className="absolute hidden bg-gray-400 bottom-7 p-1 rounded-xl group-hover:block">
            <p>edit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeEachBudget;
