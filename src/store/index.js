import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './reducers/productsSlice';

export const store = configureStore({
    reducer: {
        productsSlice: productsReducer
    }
})