import {createSlice} from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState: {
    products: [],
    favProducts: []
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
    switchItemAsFavorite: (state, action) => {
      const selectedItem = state.favProducts.find(
        ele => ele.id === action.payload.id
      );
      if (selectedItem) {
        state.favProducts = state.favProducts.filter(
          ele => ele.id !== action.payload.id
        );
      } else {
        state.favProducts = [...state.favProducts, action.payload];
      }
    }
  }
});

export const {setProducts, switchItemAsFavorite} = productsSlice.actions;

export default productsSlice.reducer;
