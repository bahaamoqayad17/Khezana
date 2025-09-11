import axios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notification } from "./models.type";

// Define the state
interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  popup: any;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
  popup: null,
};

// Async thunk to fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    try {
      const response = await axios.get("notifications");

      return response.data.notifications as Notification[];
    } catch (error) {
      console.log(error);
    }
  }
);
// Async thunk to fetch notifications
export const fetcPoPUp = createAsyncThunk(
  "notifications/fetchPoPUp",
  async () => {
    try {
      const response = await axios.get("pop-up-notification/latest");
      console.log({ response: response.data });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Slice
const NotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.is_read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.is_read = true;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload || [];
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notifications";
      });

    builder
      .addCase(fetcPoPUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetcPoPUp.fulfilled, (state, action) => {
        state.loading = false;
        state.popup = action.payload;
      });
  },
});

export const { markAsRead, markAllAsRead } = NotificationSlice.actions;
export default NotificationSlice.reducer;
