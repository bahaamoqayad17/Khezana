import axios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book, Category } from "./models.type";

// Define the state
interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  books_categories: any[];
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  books_categories: [],
};

// Async thunk to fetch posts
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get("/categories");
    return response.data.categories as Category[];
  }
);

export const fetchBooksCategories = createAsyncThunk(
  "categories/fetchBooksCategories",
  async (id: string) => {
    const response = await axios.get(`/categories/${id}/books`);

    return response.data.data as Book[];
  }
);

// Slice
const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // addLoading: (state) => {
    //   state.loading = true;
    // },
    // removeLoading: (state) => {
    //   state.loading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(fetchBooksCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooksCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.books_categories = action.payload;
      })
      .addCase(fetchBooksCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch books categories";
      });
  },
});

export default CategorySlice.reducer;
