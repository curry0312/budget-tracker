import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
  ],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addNewCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewCategory } = categoriesSlice.actions;

export const categoriesSelector = (state) => state.categories.categories

export default categoriesSlice.reducer;
