import React, { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { categoriesSelector } from "../features/categoriesSlice";
import { addBudget } from "../features/budgetsSlice";
import { formatDate } from "../util/formatDate";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Budget' name can't be empty"),
    price: yup.string().required("Budget' price can't be empty"),
    category: yup.string().required("Budget' category can't be empty"),
    date: yup.string().nullable().required("Budget' date can't be empty"),
  })
  .required();

function AddNewBudget() {
  const checkboxRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  //put the categories from its slice to react-select options
  const categories = useSelector(categoriesSelector);
  const options = useMemo(() => [...categories], [categories]);

  //useForm-react-hook-form default setting
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //yup validation
  const onSubmitHandler = (data) => {
    console.log(data);
    dispatch(addBudget(data));
    if(!checkboxRef.current.checked){
      navigate('/')
    }
    reset();
  };

  //make date in yyyy-mm-dd
  const defaultValue = formatDate();

  return (
    <section className="sm:ml-[200px] p-5">
      {/*Input section*/}
      <div>
        <form
          action=""
          className="flex flex-col space-y-4 items-center sm:items-stretch"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {/*name input*/}
          <div aria-label="name">
            <div className="text-2xl">
              <label htmlFor="name" className="text-black text-3xl font-Neucha">
                Name
              </label>
              <input
                className="p-2 font-Neucha w-full"
                id="name"
                type="text"
                {...register("name")}
                placeholder="Please enter budget's name"
              />
            </div>
            <p className="text-red-600 font-Neucha h-[25px]">
              {errors.name?.message}
            </p>
          </div>
          {/*price input*/}
          <div aria-label="price">
            <div className="text-2xl">
              <label
                htmlFor="price"
                className="text-black text-3xl font-Neucha"
              >
                Price
              </label>
              <input
                className="p-2 font-Neucha w-full"
                id="price"
                type="number"
                {...register("price")}
                placeholder="Please enter budget's price"
              />
            </div>
            <p className="text-red-600 font-Neucha h-[25px]">
              {errors.price?.message}
            </p>
          </div>
          {/*select categories*/}
          <div aria-label="select-category" className="font-Neucha">
            <p className="text-3xl">Choose the category</p>
            <div className="flex gap-2">
              <select
                className="w-full bg-lightblue-sky text-white rounded-md p-2 text-xl cursor-pointer hover:bg-blue-300"
                {...register("category")}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <button onClick={()=>{navigate('/addnewcategory')}} className="text-white bg-green-500 font-Neucha rounded-md hover:bg-green-400">Add new Category</button>
            </div>
            <p className="text-red-600 font-Neucha">
              {errors.category?.message}
            </p>
          </div>
          {/*date picker*/}
          <div aria-label="date-picker" className="font-Neucha">
            <p className="text-3xl">Choose the date</p>
            <input
              type="date"
              {...register("date")}
              className="bg-lightblue-sky text-white p-2 rounded-md"
              defaultValue={defaultValue}
            />
          </div>
          {/*continue add new budget option*/}
          <div>
            <div className="flex items-center mb-4">
              <input
                ref={checkboxRef}
                id="disabled-checkbox"
                type="checkbox"
                className="w-4 h-4 text-blue-600 font-Neucha bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="disabled-checkbox"
                className="ml-2 text-sm font-medium font-Neucha text-gray-400"
              >
                Continue adding new budget
              </label>
            </div>
          </div>
          {/*add budget button*/}
          <button
            type="submit"
            className="bg-lightblue-sky text-white font-Neucha px-4 py-2 rounded-full hover:bg-blue-300"
          >
            Add New Budget
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddNewBudget;
