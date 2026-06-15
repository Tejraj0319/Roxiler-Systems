import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", credentials);

      const data = response.data.data;

      if (data.user.role !== "ADMIN") {
        return thunkAPI.rejectWithValue(
          "Access denied. Admin account required."
        );
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, thunkAPI) => {
    try {
      const response = await api.put(
        "/auth/change-password",
        passwordData
      );

      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Password change failed"
      );
    }
  }
);