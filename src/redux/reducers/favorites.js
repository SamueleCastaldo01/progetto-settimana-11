import { ADD_FAVORITES, REMOVE_FAVORITES } from "../actions";

const initialState = {
    content: [],
};

const FavoritesRed = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITES:
      const newState = {
        ...state,
          content: [...state.content, action.payload],

      };
      // Aggiungi il console.log per verificare lo stato
      console.log("Azione:", action);
      console.log("Stato precedente:", state);
      console.log("Nuovo stato:", newState);
      return newState;

      case REMOVE_FAVORITES:
        const delState = {
            ...state,
              content: state.content.filter((fav) => fav._id !== action.payload),
        }
        return delState;

  

    default: {
      return state;
    }
  }
};

export default FavoritesRed;
