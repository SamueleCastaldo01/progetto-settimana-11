// reducers/FavoritesRed.js
import { ADD_FAVORITES, REMOVE_FAVORITES } from "../actions";

const initialState = {
  content: [],
};

const FavoritesRed = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITES:
      // Controlla se il brano è già presente per evitare duplicati
      const isAlreadyFavorite = state.content.some(fav => fav._id === action.payload._id);
      
      if (isAlreadyFavorite) {
        console.log("Il brano è già nei preferiti:", action.payload);
        return state; // Non aggiungere se già presente
      }

      const newState = {
        ...state,
        content: [...state.content, action.payload],
      };

      console.log("Azione ADD_FAVORITES:");
      console.log("Stato precedente:", state);
      console.log("Nuovo stato:", newState);
      return newState;

    case REMOVE_FAVORITES:
      const updatedState = {
        ...state,
        content: state.content.filter((fav) => fav._id !== action.payload),
      };

      console.log("Azione REMOVE_FAVORITES:");
      console.log("Stato precedente:", state);
      console.log("Nuovo stato:", updatedState);
      return updatedState;

    default:
      return state;
  }
};

export default FavoritesRed;
