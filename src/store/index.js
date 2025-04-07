import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './reducers/productsSlice';
import cartReducer from './reducers/cartSlice';
import userReducer from './reducers/userSlice';

export const store = configureStore({
    reducer: {
        productsSlice: productsReducer,
        cartSlice: cartReducer,
        userSlice: userReducer
    }
})