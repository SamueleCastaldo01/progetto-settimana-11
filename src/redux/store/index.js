import { configureStore, combineReducers } from '@reduxjs/toolkit';
import FavoritesRed from '../reducers/favorites';
import playerRed from '../reducers/playerRed'; 
import searchRed from '../reducers/searchRed';

const bigReducer = combineReducers({
  favorites: FavoritesRed,
  player: playerRed, // Aggiungi il reducer del player
  search: searchRed
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;

