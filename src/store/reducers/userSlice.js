import {createSlice} from '@reduxjs/toolkit';
import { fetchReviewersQuotes } from '../../api/General';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    reviewersQuotes: [],
    isQuotesLoading: false,
    errors: null
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchReviewersQuotes.pending, state => {
        state.isQuotesLoading = true;
        state.errors = null;
        console.log('Fetching Quotes is Pending...');
    });
    builder.addCase(fetchReviewersQuotes.fulfilled, (state, action) => {
        state.reviewersQuotes = action.payload;
        state.isQuotesLoading = false;
        state.errors = null;
        console.log('Redux-Fetched-Quotes: ', action.payload);
    });
    builder.addCase(fetchReviewersQuotes.rejected, (state, action) => {
        state.isQuotesLoading = false;
        state.errors = action.payload;
        console.log('Error/Rejected While Fetching Quotes... ', action.payload);
    });
  }
});

export default userSlice.reducer;
