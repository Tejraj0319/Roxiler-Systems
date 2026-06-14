import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", loginData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerData, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", registerData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
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

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);