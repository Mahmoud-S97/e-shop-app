import {createSlice} from '@reduxjs/toolkit';
import {fetchProducts} from '../../api/General';

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState: {
    products: [],
    favProducts: [],
    totalAvailableProducts: null,
    productsLimit: 10,
    productsSkipped: 0,
    hasMoreData: true,
    isLoadingProducts: false,
    isFetchingMoreProducts: false,
    errors: null,
    onHoldRemovedFavItemID: null
  },
  reducers: {
    setProductsSkipped: (state, action) => {
      state.productsSkipped = state.productsSkipped + action.payload
    },
    setHasMoreData: (state, action) => {
      state.hasMoreData = action.payload;
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
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      if(state.products.length === 0) { // First time products loading
        state.isLoadingProducts = true;
      }
      state.isFetchingMoreProducts = true;
      state.errors = null;
      console.log('Fetching Product is Pending...');
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isFetchingMoreProducts = false;
      state.isLoadingProducts = false;
      state.errors = null;
      state.products = [...state.products, ...action.payload.products];
      state.totalAvailableProducts = action.payload.total;
      console.log('Redux-Fetched-Products: ', action.payload.products);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isFetchingMoreProducts = false;
      state.isLoadingProducts = false;
      state.errors = action.payload;
      console.log('Error/Rejected While Fetching Products... ', action.payload);
    });
  }
});

export const {
  setProductsSkipped,
  setHasMoreData,
  switchItemAsFavorite,
  setRemovedFavItemID,
  removeItemFromFavorites
} = productsSlice.actions;

export default productsSlice.reducer;
