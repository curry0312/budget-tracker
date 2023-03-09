import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryEdit from "../components/CategoryEdit";
import { addNewCategory, categoriesSelector } from "../features/categoriesSlice";

function AddNewCategory() {
  const categories = useSelector(categoriesSelector);
  const dispatch = useDispatch()
  const categoryRef = useRef(null);
  return (
    <section className="ml-[200px] p-4 flex flex-col space-y-5">
      <div className="flex gap-2">
        <label htmlFor="category" className="text-black font-Tilt text-3xl">
          Add Category:
        </label>
        <input
          ref={categoryRef}
          id="category"
          type="text"
          className="border-b flex-grow font-Neucha p-1"
          placeholder="Enter the category you want"
        />
        <button onClick={()=>dispatch(addNewCategory(categoryRef.current.value))} className="bg-green-500 rounded-md px-4 py-1 text-white font-Neucha transtion duration-200 ease-in hover:bg-green-400">
          Add
        </button>
      </div>
      <div>
        <p className="text-black font-Tilt text-3xl">
          Edited categories you current have({categories.length}):
        </p>
        <div className="flex space-x-2 p-3">
          {categories.map((category, index) => {
            return <CategoryEdit key={index} category={category} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default AddNewCategory;
