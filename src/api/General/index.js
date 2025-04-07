import {createAsyncThunk} from '@reduxjs/toolkit';

// Fetch Specified Products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (parameters, {rejectWithValue}) => {
    const {productsLimit, productsSkipped} = parameters;
    console.log(
      `ProductsLimit: ${productsLimit} | ProductsSkipped: ${productsSkipped}`
    );
    try {
      const fetchedProducts = await fetch(
        `https://dummyjson.com/products?limit=${productsLimit}&skip=${productsSkipped}`
      );
      const jsonFetchedProducts = await fetchedProducts.json();
      console.log('fetchedProducts-createAsyncThunk:: ', jsonFetchedProducts);
      return jsonFetchedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Reviewers' Quotes
export const fetchReviewersQuotes = createAsyncThunk(
  'user/fetchReviewersQuotes',
  async (parameters, {rejectWithValue}) => {
    try {
      const fetchedQuotes = await fetch(`https://dummyjson.com/quotes`);
      const jsonFetchedQuotes = await fetchedQuotes.json();
      const updatedQuotes = jsonFetchedQuotes.quotes.map((quote, index) => {
        return { ...quote, image: `https://picsum.photos/seed/${index}/200/200`, rating: Math.floor(Math.random() * 5) + 1 }
      })
      console.log('Updated-fetchedQuotes-createAsyncThunk:: ', updatedQuotes);
      return updatedQuotes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
