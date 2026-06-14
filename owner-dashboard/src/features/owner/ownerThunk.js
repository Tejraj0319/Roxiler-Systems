import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch Owner Dashboard
export const getOwnerDashboard = createAsyncThunk(
    "owner/getOwnerDashboard",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/owner/dashboard");

            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch dashboard"
            );
        }
    }
);