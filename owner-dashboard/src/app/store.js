import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import ownerReducer from "../features/owner/ownerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    owner: ownerReducer,
  },
});