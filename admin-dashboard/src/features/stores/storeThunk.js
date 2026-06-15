import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getStores = createAsyncThunk(
  "stores/getStores",
  async (params = {}, thunkAPI) => {
    try {
      const response = await api.get("/admin/stores", {
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

export const getStoreById = createAsyncThunk(
  "stores/getStoreById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/admin/stores/${id}`);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch store details"
      );
    }
  }
);

export const createStore = createAsyncThunk(
  "stores/createStore",
  async (storeData, thunkAPI) => {
    try {
      const response = await api.post(
        "/admin/stores",
        storeData
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create store"
      );
    }
  }
);