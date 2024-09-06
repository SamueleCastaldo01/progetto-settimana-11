// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa il localStorage per la persistenza
import FavoritesRed from '../reducers/favorites';
import playerRed from '../reducers/playerRed';
import searchRed from '../reducers/searchRed';
import queueReducer from '../reducers/queueReducer';

// Configurazione del persistConfig
const persistConfig = {
  key: 'root',
  storage,
};

// Combina i reducers e crea il persistedReducer
const bigReducer = combineReducers({
  favorites: FavoritesRed,
  player: playerRed,
  search: searchRed,
  queue: queueReducer,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

// Configura il Redux store con il persistedReducer
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
