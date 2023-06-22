import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  budgets: [
    {
      id: "sp59vdva",
      name: "Hamburger",
      price: '150',
      category: "breakfast",
      date: "2023-07-09",
    },
  ],
};

export const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    addBudget: (state, action) => {
      state.budgets = [...state.budgets, { id: nanoid(), ...action.payload }];
    },
    editBudget: (state, action) => {
      const copyBudgets = [...state.budgets];
      const newCopyBudgets = copyBudgets.map((budget) => {
        if (budget.id === action.payload.id) {
            return {...budget,...action.payload}
        }
        else{
            return budget
        }
      });
      state.budgets = [...newCopyBudgets]
    },
    deleteBudgets:(state,action) =>{
      const copyBudgets = [...state.budgets]
      const newFilteredBudgets = copyBudgets.filter((budget,index)=>{
        return budget.id !== action.payload
      })
      state.budgets = [...newFilteredBudgets]
    }
  },
});

export const { addBudget, editBudget, deleteBudgets } = budgetsSlice.actions;

export const budgetsSelector = (state) => state.budgets.budgets;

export default budgetsSlice.reducer;
