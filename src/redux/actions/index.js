export const REMOVE_FAVORITES = "REMOVE_FAVORITES"
export const ADD_FAVORITES = "ADD_FAVORITES"
export const GET_JOB_LIST = "GET_JOB_LIST"
export const GET_JOB_LIST_ERROR = "GET_JOB_LIST_ERROR"
export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
export const SET_IS_PLAYING = "SET_IS_PLAYING";
export const SET_VOLUME = "SET_VOLUME";
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const GET_SEARCH_RESULTS_ERROR = 'GET_SEARCH_RESULTS_ERROR';
export const RESET_SEARCH_RESULTS = 'RESET_SEARCH_RESULTS';


export const addFavorites = (track) => ({
    type: ADD_FAVORITES,
    payload: track,
  });
  
  export const removeFavorites = (trackId) => ({
    type: REMOVE_FAVORITES,
    payload: trackId,
  });

export const setCurrentTrack = (track) => ({
    type: SET_CURRENT_TRACK,
    payload: track,
  });
  
  export const setIsPlaying = (isPlaying) => ({
    type: SET_IS_PLAYING,
    payload: isPlaying,
  });
  
  export const setVolume = (volume) => ({
    type: SET_VOLUME,
    payload: volume,
  });

  export const getSearchResults = (query) => {
    return async (dispatch) => {
      const baseEndpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
      console.log("Fetching from:", baseEndpoint + query);  // Verifica l'endpoint completo
      
      try {
        const response = await fetch(baseEndpoint + query);
        if (response.ok) {
          const { data } = await response.json();
          console.log("Search results data:", data);  // Verifica i dati della risposta
          dispatch({
            type: GET_SEARCH_RESULTS,
            payload: data,
          });
        } else {
          console.log("Error fetching search results");
          dispatch({
            type: GET_SEARCH_RESULTS_ERROR,
          });
        }
      } catch (error) {
        console.log("Error in fetch:", error);
        dispatch({
          type: GET_SEARCH_RESULTS_ERROR,
        });
      }
    };
  };

  export const resetSearchResults = () => ({
    type: RESET_SEARCH_RESULTS,
  });
  