import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (params = {}, thunkAPI) => {
    try {
      const response = await api.get("/admin/users", {
        params,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    }
  }
);

export const getUserById = createAsyncThunk(
    "users/getUserById",
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/admin/users/${id}`);

            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch user"
            );
        }
    }
);

export const createUser = createAsyncThunk(
    "users/createUser",
    async (userData, thunkAPI) => {
        try {
            const response = await api.post(
                "/admin/users",
                userData
            );

            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to create user"
            );
        }
    }
);
