import React from "react";
import { currency } from "../util/currency";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

function HomeEachBudget({ budget }) {
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="flex font-Neucha bg-lightblue-ocean text-white p-3 rounded-lg">
        <div className="basis-1/4">{budget.date}</div>
        <div className="basis-1/4">{budget.name}</div>
        <div className="basis-1/4">{budget.category}</div>
        <div className="basis-1/4">{currency.format(budget.price)}</div>
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
