import {createSlice} from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState: {
    products: [],
    favProducts: [],
    onHoldRemovedFavItemID: null
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
    },
    setRemovedFavItemID: (state, action) => {
      state.onHoldRemovedFavItemID = action.payload;
    },
    removeItemFromFavorites: (state, action) => {
      state.favProducts = state.favProducts.filter(
        ele => ele.id !== action.payload
      );
      state.onHoldRemovedFavItemID = null;
    }
  }
});

export const {
  setProducts,
  switchItemAsFavorite,
  setRemovedFavItemID,
  removeItemFromFavorites
} = productsSlice.actions;

export default productsSlice.reducer;
