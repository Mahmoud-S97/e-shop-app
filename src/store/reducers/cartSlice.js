import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cartItems: [],
        totalPrice: 0
    },
    reducers: {
        addToCart: (state, action) => {
            console.log('action: ', action);
            state.cartItems = [...state.cartItems, action.payload]
            state.totalPrice = state.totalPrice + (action.payload.price * action.payload.qty);
        },
        incrementCart: (state, action) => {
            const updateProduct = state.cartItems.find(ele => ele.id === action.payload.id);
            if (updateProduct) {
                updateProduct.qty = updateProduct.qty + 1;
                state.totalPrice = state.totalPrice + updateProduct.price;
            } else {
                state.cartItems = [...state.cartItems, action.payload]
                state.totalPrice = state.totalPrice + (action.payload.price * action.payload.qty);
            }
        },
        decrementCart: (state, action) => {
            const updateProduct = state.cartItems.find(ele => ele.id === action.payload);
            updateProduct.qty = updateProduct.qty - 1;
            if(updateProduct.qty === 0) {
                state.totalPrice = state.totalPrice - updateProduct.price;
                state.cartItems = state.cartItems.filter(ele => ele.id !== action.payload);
                return;
            } else {
                state.totalPrice = state.totalPrice - updateProduct.price;
            }
        }
    }
});

export const { addToCart, incrementCart, decrementCart } = cartSlice.actions;

export default cartSlice.reducer;