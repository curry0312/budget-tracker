import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { categoriesSelector } from "../features/categoriesSlice";
import { budgetsSelector, editBudget } from "../features/budgetsSlice";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Budget' name can't be empty"),
    price: yup.string().required("Budget' price can't be empty"),
    category: yup.string().required("Budget' category can't be empty"),
    date: yup.string().nullable().required("Budget' date can't be empty"),
  })
  .required();

function EditBudget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const budgets = useSelector(budgetsSelector);
  console.log("budgets", budgets);
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

  const { id } = useParams();
  const targetBudget = budgets.find((budget) => budget.id === id);

  const onSubmitHandler = (data) => {
    console.log(data);
    dispatch(editBudget({ id: targetBudget.id, ...data }));
    navigate('/')
    reset();
  };

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
                className="p-2 font-Neucha w-full border border-lightblue-sky rounded-md"
                id="name"
                type="text"
                {...register("name")}
                placeholder="Please enter budget's name"
                defaultValue={targetBudget.name}
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
                className="p-2 font-Neucha w-full border border-lightblue-sky rounded-md"
                id="price"
                type="number"
                {...register("price")}
                placeholder="Please enter budget's price"
                defaultValue={targetBudget.price}
              />
            </div>
            <p className="text-red-600 font-Neucha h-[25px]">
              {errors.price?.message}
            </p>
          </div>
          {/*select categories*/}
          <div aria-label="select-category" className="font-Neucha">
            <p className="text-3xl">Choose the category</p>
            <select
              className="w-full bg-lightblue-sky text-white rounded-md p-2 text-xl cursor-pointer hover:bg-blue-200"
              {...register("category")}
            >
              {options.map((option) => {
                if (option.value === targetBudget.category) {
                  return (
                    <option key={option.value} value={option.value} selected>
                      {option.label}
                    </option>
                  );
                } else {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  );
                }
              })}
            </select>
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
              defaultValue={targetBudget.date}
            />
          </div>
          {/*edit budget button*/}
          <button
            type="submit"
            className="bg-lightblue-sky text-white font-Neucha px-4 py-2 rounded-full hover:bg-blue-300"
          >
            Edit Budget
          </button>
          {/*unedit budget button*/}
          <button
            onClick={() => navigate("/")}
            type="submit"
            className="bg-lightblue-sky text-white font-Neucha px-4 py-2 rounded-full hover:bg-blue-300"
          >
            Unedit Budget
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditBudget;
