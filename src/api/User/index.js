import {createAsyncThunk} from '@reduxjs/toolkit';
import {GET_QUOTES, GET_USER_DATA} from '../ApiEndPoints';
import {ACTION_KEYS} from '../actionKeys';

export const fetchUserData = createAsyncThunk(
  ACTION_KEYS.FETCH_USER_DATA,
  async (parameters, {rejectWithValue}) => {
    console.log('Mahmoud:: ', parameters);
    const { currentUserId } = parameters;
    try {
      const response = await fetch(`${GET_USER_DATA}/${currentUserId}`);
      const userData = await response.json();
      console.log('User-Profile:: ', userData);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

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
