import {createAsyncThunk} from '@reduxjs/toolkit';
import {GET_PRODUCTS} from '../ApiEndPoints';
import {ACTION_KEYS} from '../actionKeys';

// Fetch Limited Products
export const fetchProducts = createAsyncThunk(
  ACTION_KEYS.FETCH_PRODUCTS,
  async (parameters, {rejectWithValue}) => {
    const {productsLimit, productsSkipped} = parameters;
    console.log(
      `ProductsLimit: ${productsLimit} | ProductsSkipped: ${productsSkipped}`
    );
    try {
      const fetchedProducts = await fetch(
        `${GET_PRODUCTS}?limit=${productsLimit}&skip=${productsSkipped}`
      );
      const jsonFetchedProducts = await fetchedProducts.json();
      console.log('fetchedProducts-createAsyncThunk:: ', jsonFetchedProducts);
      return jsonFetchedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
