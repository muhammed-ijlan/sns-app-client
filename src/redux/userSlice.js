import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    isLoading: false,
    reload: false,
};

const userSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;

        },
        loginFailure: (state) => {
            state.isLoading = false;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isLoading = false;
            localStorage.clear();
        },
        pageReload: (state) => {
            state.reload = !state.reload;
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout, pageReload } = userSlice.actions;
export default userSlice.reducer;