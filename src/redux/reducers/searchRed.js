import {
  GET_SEARCH_RESULTS,
  GET_SEARCH_RESULTS_ERROR,
  RESET_SEARCH_RESULTS,
} from "../actions";

const initialState = {
  searchResults: [],
  error: false,
};

const searchRed = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
        error: false,
      };
    case GET_SEARCH_RESULTS_ERROR:
      return {
        ...state,
        searchResults: [],
        error: true,
      };
    case RESET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [], // Resetta i risultati della ricerca
      };
    default:
      return state;
  }
};

export default searchRed;
