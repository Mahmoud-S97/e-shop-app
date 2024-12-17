import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './reducers/productsSlice';
import cartReducer from './reducers/cartSlice';

export const store = configureStore({
    reducer: {
        productsSlice: productsReducer,
        cartSlice: cartReducer
    }
})