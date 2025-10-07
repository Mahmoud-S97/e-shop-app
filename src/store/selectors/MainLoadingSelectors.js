import { createSelector } from '@reduxjs/toolkit';

export const SelectMainLoading = createSelector(
    [
        (state) => state.productsSlice.isLoadingProducts,
        (state) => state.clientsSlice.isQuotesLoading,
        (state) => state.userSlice.isUserDataLoading
    ],
    (...loaders) => loaders.some(Boolean)
);