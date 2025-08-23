import axios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book } from "./models.type";

interface CartState {
  cart: any;
  loading: boolean;
  error: string | null;
  books: any;
}

const initialState: CartState = {
  cart: {
    userCart: [] as Book[],
    sumPrice: 0,
    bookCount: 0,
  },
  loading: false,
  error: null,
  books: [],
};

// Async thunk to fetch posts
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get("/user/cart");

  return response.data;
});

export const userBooks = createAsyncThunk("cart/userBooks", async () => {
  const response = await axios.get("/user/books");
  return response.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (bookId: number) => {
    const response = await axios.post("/user/add/cart", { book_id: bookId });

    console.log("addToCart", response.data);
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (bookId: number) => {
    try {
      const response = await axios.post(`/user/delete/cart`, {
        book_id: bookId,
      });

      console.log("removeFromCart", response.data);
      return response.data;
    } catch (error) {
      console.log("removeFromCart", JSON.stringify(error));
    }
  }
);

// Slice
const CartSlice = createSlice({
  name: "cart",
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
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });

    builder
      .addCase(userBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.userBook;
      });

    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        // state.cart.userCart.push(action.payload);
        // state.cart.sumPrice += action.payload.price || 0;
        // state.cart.bookCount++;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });

    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;

        // state.cart.userCart = state.cart.userCart.filter(
        //   (book: Book) => book.id !== bookId
        // );
        // state.cart.sumPrice -= action.payload.price || 0;
        // state.cart.bookCount--;
      });
  },
});

export default CartSlice.reducer;
