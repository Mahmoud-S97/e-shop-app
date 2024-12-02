import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalPrice: 0
    },
    reducers: {
        //...
    }
});

export default cartSlice.reducer;