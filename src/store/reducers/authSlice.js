import {createSlice} from '@reduxjs/toolkit';
import {loginOrSignUpHandler} from '../actions/authActions';

const initialState = {
  authData: null,
  isLoggedIn: false,
  isAuthDataLoading: false,
  errors: null
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUserLogout: () => initialState
  },
  extraReducers: builder => {
    builder
      // Auth Cases
      .addCase(loginOrSignUpHandler.pending, state => {
        state.isAuthDataLoading = true;
        state.isLoggedIn = false;
        state.errors = null;
        console.log('Auth Checking is Pending...');
      })
      .addCase(loginOrSignUpHandler.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.isLoggedIn = true;
        state.isAuthDataLoading = false;
        state.errors = null;
        console.log('Redux-Auth-Succeeded: ', action.payload);
      })
      .addCase(loginOrSignUpHandler.rejected, (state, action) => {
        state.errors = action.payload;
        state.isAuthDataLoading = false;
        state.isLoggedIn = false;
        console.log('Error/Rejected While Authenticating... ', action.payload);
      });
  }
});

export const {setUserLogout} = authSlice.actions;
export default authSlice.reducer;
