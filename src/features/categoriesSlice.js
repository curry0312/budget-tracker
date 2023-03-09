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
      state.categories = [
        ...state.categories,
        {
          value: action.payload,
          label: action.payload[0].toUpperCase() + action.payload.slice(1),
        },
      ];
    },
    deleteCategory: (state, action) => {
      const copyCategories = [...state.categories]
      const filteredCategories = copyCategories.filter( category => {
        return category.value !== action.payload.value
      })
      state.categories = [...filteredCategories]
    }
  },
});

// Action creators are generated for each case reducer function
export const { addNewCategory, deleteCategory } = categoriesSlice.actions;

export const categoriesSelector = (state) => state.categories.categories;

export default categoriesSlice.reducer;
