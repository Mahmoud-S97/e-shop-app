import {createAsyncThunk} from '@reduxjs/toolkit';
import {GET_QUOTES} from '../ApiEndPoints';
import {ACTION_KEYS} from '../actionKeys';

// Fetch Reviewers' Quotes
export const fetchReviewersQuotes = createAsyncThunk(
  ACTION_KEYS.FETCH_CLIENTS_REVIEW_QUOTES,
  async (parameters, {rejectWithValue}) => {
    try {
      const fetchedQuotes = await fetch(GET_QUOTES);
      const jsonFetchedQuotes = await fetchedQuotes.json();
      const updatedQuotes = jsonFetchedQuotes.quotes.map((quote, index) => {
        return {
          ...quote,
          image: `https://picsum.photos/seed/${index}/200/200`,
          rating: Math.floor(Math.random() * 5) + 1
        };
      });
      console.log('Updated-fetchedQuotes-createAsyncThunk:: ', updatedQuotes);
      return updatedQuotes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
