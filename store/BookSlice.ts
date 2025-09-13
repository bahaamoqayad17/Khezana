import axios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book, Category, Review, Slider } from "./models.type";

// Define the state
interface HomePage {
  slides: Slider[];
  categories_with: any[];
  categories: Category[];
}

interface BookState {
  home: HomePage;
  loading: boolean;
  error: string | null;
  book: Book;
}

const initialState: BookState = {
  home: {
    slides: [],
    categories: [],
    categories_with: [],
  },
  loading: false,
  error: null,
  book: {} as Book,
};

// Async thunk to fetch posts
export const fetchHomePage = createAsyncThunk(
  "books/fetchHomePage",
  async () => {
    const response = await axios.get("/homepage");

    return response.data as HomePage;
  }
);

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (id: string) => {
    try {
      const response = await axios.get(`/book/details/${id}`);

      return response.data as Book;
    } catch (error) {
      console.log("fetchBook", JSON.stringify(error));
      return error;
    }
  }
);

export const addReview = createAsyncThunk(
  "books/addReview",
  async ({
    book_id,
    rating,
    comment,
  }: {
    book_id: number;
    rating: number;
    comment: string;
  }) => {
    try {
      const response = await axios.post("rating/book", {
        book_id,
        rating,
        comment,
      });

      console.log("addReview", response.data);
      return response.data as Review;
    } catch (error) {
      console.log("addReview", JSON.stringify(error));
      return error;
    }
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

    builder
      .addCase(fetchBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload as Book;
      })
      .addCase(addReview.pending, (state) => {
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.book.reviews.push(action.payload as Review);
      });
  },
});

export default BookSlice.reducer;
