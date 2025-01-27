import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (parameters, thunkAPI) => {

    const { productsLimit, productsSkipped } = parameters;

    console.log(`ProductsLimit: ${productsLimit} | ProductsSkipped: ${productsSkipped}`);

    const fetchedProducts = await fetch(
      `https://dummyjson.com/products?limit=${productsLimit}&skip=${productsSkipped}`
    );

    const jsonFetchedProducts = await fetchedProducts.json();
    console.log('fetchedProducts-createAsyncThunk:: ', jsonFetchedProducts);

    return jsonFetchedProducts;
  }
);
