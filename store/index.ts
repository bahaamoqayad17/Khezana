import { configureStore } from "@reduxjs/toolkit";
import BlogSlice from "./BlogSlice";
import BookSlice from "./BookSlice";
import CategorySlice from "./CategorySlice";
import CartSlice from "./CartSlice";
import NotificationSlice from "./NotificationSlice";
import SubscriptionSlice from "./SubscriptionSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
  reducer: {
    blog: BlogSlice,
    categories: CategorySlice,
    subscriptions: SubscriptionSlice,
    notifications: NotificationSlice,
    books: BookSlice,
    user: UserSlice,
    cart: CartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
