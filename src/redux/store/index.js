import { configureStore, combineReducers } from '@reduxjs/toolkit';
import FavoritesRed from '../reducers/favorites';
import playerRed from '../reducers/playerRed'; // Importa il reducer del player

const bigReducer = combineReducers({
  favorites: FavoritesRed,
  player: playerRed, // Aggiungi il reducer del player
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;

