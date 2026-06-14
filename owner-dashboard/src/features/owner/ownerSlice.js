import { createSlice } from "@reduxjs/toolkit";
import { getOwnerDashboard } from "./ownerThunk";

const initialState = {
    dashboard: null,
    loading: false,
    error: null,
};

const ownerSlice = createSlice({
    name: "owner",
    initialState,

    reducers: {
        clearOwnerError: (state) => {
            state.error = null;
        },

        clearOwnerData: (state) => {
            state.dashboard = null;
            state.loading = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(getOwnerDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getOwnerDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard = action.payload;
            })

            .addCase(getOwnerDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearOwnerError,
    clearOwnerData,
} = ownerSlice.actions;

export default ownerSlice.reducer;

