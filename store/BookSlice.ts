import axios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book, Category, Slider } from "./models.type";

// Define the state
interface HomePage {
  slides: Slider[];
  categories: Category[];
  top_viewed: Book[];
  for_you: Book[];
}

interface BookState {
  home: HomePage;
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  home: {
    slides: [],
    categories: [],
    top_viewed: [],
    for_you: [],
  },
  loading: false,
  error: null,
};

// Async thunk to fetch posts
export const fetchHomePage = createAsyncThunk(
  "books/fetchHomePage",
  async () => {
    const response = await axios.get("/homepage");

    console.log(response.data);

    return response.data as HomePage;
  }
);

// Slice
const BookSlice = createSlice({
  name: "books",
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
      .addCase(fetchHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.home = action.payload;
      })
      .addCase(fetchHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export default BookSlice.reducer;
