import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import storeReducer from "../features/stores/storeSlice";
import ratingReducer from "../features/ratings/ratingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stores: storeReducer,
    ratings: ratingReducer
  },
});