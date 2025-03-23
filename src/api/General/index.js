import {createAsyncThunk} from '@reduxjs/toolkit';

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
