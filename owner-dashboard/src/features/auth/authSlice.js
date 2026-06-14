import { createSlice } from "@reduxjs/toolkit";
import { loginUser, changePassword } from "./authThunk";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user || null,
    token: token || null,
    isAuthenticated: !!token,

    loading: false,
    error: null,

    passwordChangeSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.passwordChangeSuccess = false;
        },

        clearError: (state) => {
            state.error = null;
        },

        resetPasswordChangeSuccess: (state) => {
            state.passwordChangeSuccess = false;
        },
    },

    extraReducers: (builder) => {
        builder
            // login

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;

                const { token, user } = action.payload;

                //   Allow only STORE_OWNER
                if (user.role !== "STORE_OWNER") {
                    state.error = "Access denied. Store Owner account required.";

                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    state.user = null;
                    state.token = null;
                    state.isAuthenticated = false;

                    return;
                }

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                state.user = user;
                state.token = token;
                state.isAuthenticated = true;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //   CHange password

            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.passwordChangeSuccess = false;
            })

            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                state.passwordChangeSuccess = true;
            })

            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    logout,
    clearError,
    resetPasswordChangeSuccess,
} = authSlice.actions;

export default authSlice.reducer;

