import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import productsReducer from './reducers/productsSlice';
import cartReducer from './reducers/cartSlice';
import authReducer from './reducers/authSlice';
import clientsReducer from './reducers/clientsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cartSlice', 'authSlice']
};

const rootReducer = combineReducers({
  productsSlice: productsReducer,
  cartSlice: cartReducer,
  authSlice: authReducer,
  clientsSlice: clientsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
