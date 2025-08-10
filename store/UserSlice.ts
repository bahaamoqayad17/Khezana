import axios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Author, Publisher, User } from "./models.type";

// Define the state
interface UserState {
  user: User | null;
  publisher: Publisher | null;
  author: Author | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {} as User,
  publisher: null,
  author: null,
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

export const fetchPublisher = createAsyncThunk(
  "user/fetchPublisher",
  async (publisherId: number) => {
    // const response = await axios.get(`/publisher/${publisherId}`);
    const response = await axios.get(`/publisher/1`);
    return response.data as Publisher;
  }
);

export const fetchAuthor = createAsyncThunk(
  "user/fetchAuthor",
  async (authorId: number) => {
    // const response = await axios.get(`/author/${authorId}`);
    const response = await axios.get(`/author/1`);
    return response.data as Author;
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
    builder
      .addCase(fetchPublisher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublisher.fulfilled, (state, action) => {
        state.loading = false;
        state.publisher = action.payload;
      })
      .addCase(fetchPublisher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch publisher";
      });

    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.author = action.payload;
      });
  },
});

export default UserSlice.reducer;
