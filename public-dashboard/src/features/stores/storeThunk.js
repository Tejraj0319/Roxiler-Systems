import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getStores = createAsyncThunk(
  "stores/getStores",
  async (params = {}, thunkAPI) => {
    try {
      const response = await api.get("/stores", {
        params,
      });

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch stores"
      );
    }
  }
);