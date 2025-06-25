import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './reducers/productsSlice';
import cartReducer from './reducers/cartSlice';
import authReducer from './reducers/authSlice';
import clientsReducer from './reducers/clientsSlice';

export const store = configureStore({
    reducer: {
        productsSlice: productsReducer,
        cartSlice: cartReducer,
        authSlice: authReducer,
        clientsSlice: clientsReducer
    }
})