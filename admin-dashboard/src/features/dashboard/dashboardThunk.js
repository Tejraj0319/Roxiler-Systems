import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getDashboardStats = createAsyncThunk(
    "dashboard/getDashboardStats",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/admin/dashboard");

            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );
        }
    }
);