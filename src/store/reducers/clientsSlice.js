import {createSlice} from '@reduxjs/toolkit';
import {fetchReviewersQuotes} from '../actions/userActions';


export const clientsSlice = createSlice({
  name: 'clientsSlice',
  initialState: {
    reviewersQuotes: [],
    isQuotesLoading: false,
    errors: null
  },
  extraReducers: builder => {
    builder
      // Reviewers' Quotes Cases
      .addCase(fetchReviewersQuotes.pending, state => {
        state.isQuotesLoading = true;
        state.errors = null;
        console.log('Fetching Quotes is Pending...');
      })
      .addCase(fetchReviewersQuotes.fulfilled, (state, action) => {
        state.reviewersQuotes = action.payload;
        state.isQuotesLoading = false;
        state.errors = null;
        console.log('Redux-Fetched-Quotes: ', action.payload);
      })
      .addCase(fetchReviewersQuotes.rejected, (state, action) => {
        state.isQuotesLoading = false;
        state.errors = action.payload;
        console.log('Error/Rejected While Fetching Quotes... ', action.payload);
      });
  }
});

export default clientsSlice.reducer;
