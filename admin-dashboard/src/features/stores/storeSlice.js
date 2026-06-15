import { createSlice } from "@reduxjs/toolkit";

import {
    getStores,
    getStoreById,
    createStore,
} from "./storeThunk";

const initialState = {
    stores: [],
    selectedStore: null,
    loading: false,
    error: null,
    createSuccess: false,
};

const storeSlice = createSlice({
    name: "stores",
    initialState,

    reducers: {
        clearStoreError: (state) => {
            state.error = null;
        },

        resetCreateSuccess: (state) => {
            state.createSuccess = false;
        },

        clearSelectedStore: (state) => {
            state.selectedStore = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(getStores.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getStores.fulfilled, (state, action) => {
                state.loading = false;
                state.stores = action.payload;
            })

            .addCase(getStores.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getStoreById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedStore = action.payload;
            })

            .addCase(createStore.fulfilled, (state, action) => {
                state.loading = false;
                state.createSuccess = true;

                state.stores.unshift(action.payload);
            });
    },
});

export const {
    clearStoreError,
    resetCreateSuccess,
    clearSelectedStore,
} = storeSlice.actions;

export default storeSlice.reducer;