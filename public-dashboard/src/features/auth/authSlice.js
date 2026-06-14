import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  changePassword,
} from "./authThunk";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  isAuthenticated: !!token,

  loading: false,
  error: null,

  registerSuccess: false,
  passwordChangeSuccess: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    clearError: (state) => {
      state.error = null;
    },

    resetRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },

    resetPasswordChangeSuccess: (state) => {
      state.passwordChangeSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const { token, user } = action.payload.data;

        state.user = user;
        state.token = token;
        state.isAuthenticated = true;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registerSuccess = false;
      })

      // CHANGE PASSWORD
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordChangeSuccess = false;
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordChangeSuccess = true;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.passwordChangeSuccess = false;
      });
  },
});

export const {
  logout,
  clearError,
  resetRegisterSuccess,
  resetPasswordChangeSuccess,
} = authSlice.actions;

export default authSlice.reducer;