import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categoriesSlice";
import budgetsReducer from "../features/budgetsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    budgets: budgetsReducer
  },
});
