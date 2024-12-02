import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: {
        products: []
    },
    reducers: {
        setProducts: (state, action) => {
            console.log('ACTION: ', action);
            state.products = [...state.products, ...action.payload];
        }
    }
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;