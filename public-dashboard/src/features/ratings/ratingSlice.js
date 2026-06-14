import { createSlice } from "@reduxjs/toolkit";
import { submitRating, updateRating } from "./ratingThunk";

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

const ratingSlice = createSlice({
  name: "ratings",

  initialState,

  reducers: {
    clearRatingState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(submitRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(submitRating.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })

      .addCase(submitRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateRating.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateRating.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })

      .addCase(updateRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRatingState } = ratingSlice.actions;

export default ratingSlice.reducer;