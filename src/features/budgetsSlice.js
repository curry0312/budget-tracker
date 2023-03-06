import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  budgets: [
    {
      id: "fgwrgw443df",
      name: "吃摩斯",
      price: '12',
      category: "dinner",
      date: "2023-03-01",
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
  },
});

export const { addBudget, editBudget } = budgetsSlice.actions;

export const budgetsSelector = (state) => state.budgets.budgets;

export default budgetsSlice.reducer;
