import { createSlice } from "@reduxjs/toolkit";
import { getStores } from "./storeThunk";

const initialState = {
  stores: [],
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "stores",

  initialState,

  reducers: {},

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
      });
  },
});

export default storeSlice.reducer;