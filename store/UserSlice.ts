import axios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./models.type";

// Define the state
interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {} as User,
  loading: false,
  error: null,
};

// Async thunk to fetch posts
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId: number) => {
    const response = await axios.get(`/users/${userId}/profile`);
    return response.data as User;
  }
);

// Slice
const UserSlice = createSlice({
  name: "user",
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
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export default UserSlice.reducer;
