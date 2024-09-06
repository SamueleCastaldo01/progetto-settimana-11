export const REMOVE_FAVORITES = "REMOVE_FAVORITES"
export const ADD_FAVORITES = "ADD_FAVORITES"
export const GET_JOB_LIST = "GET_JOB_LIST"
export const GET_JOB_LIST_ERROR = "GET_JOB_LIST_ERROR"
export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
export const SET_IS_PLAYING = "SET_IS_PLAYING";
export const SET_VOLUME = "SET_VOLUME";


export const RemoveFav = (sel) => {
    return {
    type: REMOVE_FAVORITES,
    payload: sel
    }
}

export const AddFav = (sel) => {
    return {
        type: ADD_FAVORITES,
        payload: sel
    }
}

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