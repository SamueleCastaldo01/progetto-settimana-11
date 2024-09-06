import { GET_SEARCH_RESULTS, GET_SEARCH_RESULTS_ERROR } from "../actions";

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
    default:
      return state;
  }
};

export default searchRed;