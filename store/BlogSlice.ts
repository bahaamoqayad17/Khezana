import axios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment, Post } from "./models.type";

// Define the state
interface BlogState {
  posts: Post[];
  comments: Comment[];
  loading: boolean;
  loadingComments: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  comments: [],
  loading: false,
  loadingComments: false,
  error: null,
};

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk("blog/fetchPosts", async () => {
  const response = await axios.get("/posts");

  return response.data.data as Post[];
});

export const fetchPostComments = createAsyncThunk(
  "blog/fetchPostComments",
  async (postId: number) => {
    console.log(postId);

    const response = await axios.get(`/posts/${postId}/comments`);

    return response.data as Post[];
  }
);

// Slice
const BlogSlice = createSlice({
  name: "blog",
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
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.loadingComments = true;
        state.error = null;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.loadingComments = false;
        state.comments = action.payload;
      })
      .addCase(fetchPostComments.rejected, (state, action) => {
        state.loadingComments = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export default BlogSlice.reducer;
