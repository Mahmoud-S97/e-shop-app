import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "../../api/User";


export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        userData: {},
        isUserDataLoading: false,
        errors: null
    },
    extraReducers: builder => {
        builder.addCase(fetchUserData.pending, state => {
            state.isUserDataLoading = true;
            state.errors = null;
            console.log('Fetching User-Data is Pending...');
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.isUserDataLoading = false;
            state.errors = null;
            console.log('Redux-Fetched-User-Data: ', action.payload);
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.isUserDataLoading = false;
            state.errors = action.payload;
            console.log('Error/Rejected While Fetching User-Data: ', action.payload);
        })
    }
});

export default userSlice.reducer;