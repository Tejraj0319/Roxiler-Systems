import { createSlice } from "@reduxjs/toolkit";

import {
    getUsers,
    getUserById,
    createUser,
} from "./userThunk";

const initialState = {
    users: [],
    selectedUser: null,

    loading: false,
    error: null,

    createSuccess: false,
};

const userSlice = createSlice({
    name: "users",
    initialState,

    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },

        resetCreateSuccess: (state) => {
            state.createSuccess = false;
        },

        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })

            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
            })

            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.createSuccess = true;
            })

            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearUserError,
    resetCreateSuccess,
    clearSelectedUser,
} = userSlice.actions;

export default userSlice.reducer;