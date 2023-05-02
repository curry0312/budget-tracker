import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  budgets: [
    {
      id: "fgwrgw443df",
      name: "吃摩斯",
      price: '12',
      category: "dinner",
      date: "2023-02-01",
    },
    {
      id: "rfwrgw443df",
      name: "吃1",
      price: '12',
      category: "lunch",
      date: "2023-03-09",
    },
    {
      id: "uwejh88333df",
      name: "吃3",
      price: '60',
      category: "lunch",
      date: "2023-03-20",
    },
    {
      id: "kuwe333df",
      name: "吃2",
      price: '12',
      category: "breakfast",
      date: "2023-04-12",
    },
    {
      id: "dvsvsvsjdvj",
      name: "吃2",
      price: '30',
      category: "dinner",
      date: "2023-04-30",
    },
    {
      id: "9ividvjv",
      name: "吃7",
      price: '900',
      category: "dinner",
      date: "2023-05-01",
    },
    {
      id: "vftcdvjv",
      name: "吃9",
      price: '200',
      category: "lunch",
      date: "2023-05-03",
    },
    {
      id: "jijidvjv",
      name: "吃8",
      price: '400',
      category: "dinner",
      date: "2023-05-02",
    },
    {
      id: "sfdsvvjf",
      name: "吃10",
      price: '300',
      category: "lunch",
      date: "2023-05-04",
    },
    {
      id: "sp59vdva",
      name: "吃11",
      price: '150',
      category: "breakfast",
      date: "2023-05-09",
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
