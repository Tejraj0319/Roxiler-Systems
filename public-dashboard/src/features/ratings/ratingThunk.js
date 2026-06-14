import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const submitRating = createAsyncThunk(
  "ratings/submitRating",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/ratings", data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to submit rating"
      );
    }
  }
);

export const updateRating = createAsyncThunk(
  "ratings/updateRating",
  async ({ storeId, id, rating }, thunkAPI) => {
    try {
      const ratingId = storeId ?? id;
      const response = await api.put(
        `/ratings/store/${ratingId}`,
        { rating }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update rating"
      );
    }
  }
);