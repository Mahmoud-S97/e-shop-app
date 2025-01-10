import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cartItems: [],
    onHoldDeletedItemID: null,
    totalPrice: 0
  },
  reducers: {
    incrementCart: (state, action) => {
      const updateProduct = state.cartItems.find(
        ele => ele.id === action.payload.id
      );
      if (updateProduct) {
        updateProduct.qty = updateProduct.qty + 1;
        state.totalPrice = state.totalPrice + updateProduct.price;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
        state.totalPrice =
          state.totalPrice + action.payload.price * action.payload.qty;
      }
    },
    decrementCart: (state, action) => {
      const updateProduct = state.cartItems.find(
        ele => ele.id === action.payload
      );
      updateProduct.qty = updateProduct.qty - 1;
      if (updateProduct.qty === 0) {
        state.totalPrice = state.totalPrice - updateProduct.price;
        state.cartItems = state.cartItems.filter(
          ele => ele.id !== action.payload
        );
        return;
      } else {
        state.totalPrice = state.totalPrice - updateProduct.price;
      }
    },
    setRemovedItemID: (state, action) => {
      state.onHoldDeletedItemID = action.payload;
    },
    removeItemFromCart: (state, action) => {
      const removedItem = state.cartItems.find(
        ele => ele.id === action.payload
      );
      state.totalPrice = state.totalPrice - removedItem.qty * removedItem.price;
      state.cartItems = state.cartItems.filter(
        ele => ele.id !== action.payload
      );
      state.onHoldDeletedItemID = null;
    }
  }
});

export const {
  incrementCart,
  decrementCart,
  setRemovedItemID,
  removeItemFromCart
} = cartSlice.actions;

export default cartSlice.reducer;
