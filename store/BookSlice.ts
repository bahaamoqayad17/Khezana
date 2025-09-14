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
  searchResults: any;
  searchLoading: boolean;
  searchError: string | null;
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
  searchResults: null as any,
  searchLoading: false,
  searchError: null,
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

      return response.data as Review;
    } catch (error) {
      console.log("addReview", JSON.stringify(error));
      return error;
    }
  }
);

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async ({
    query,
    category_ids,
  }: {
    query?: string;
    category_ids?: number;
  }) => {
    try {
      const response = await axios.get("/search", {
        params: {
          query,
          category_ids,
        },
      });

      return response.data.data;
    } catch (error) {
      console.log("searchBooks", JSON.stringify(error));
      throw error;
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
    resetSearchResults: (state: BookState) => {
      state.searchResults = null;
    },
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

    builder
      .addCase(searchBooks.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload as any;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error.message || "Failed to search books";
      });
  },
});

export const { resetSearchResults } = BookSlice.actions;
export default BookSlice.reducer;
