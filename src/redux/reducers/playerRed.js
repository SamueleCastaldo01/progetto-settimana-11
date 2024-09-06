const initialState = {
  currentTrack: null,
  isPlaying: false,
  volume: 1,
};

const playerRed = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_TRACK":
      return {
        ...state,
        currentTrack: action.payload,
      };

    case "SET_IS_PLAYING":
      return {
        ...state,
        isPlaying: action.payload,
      };

    case "SET_VOLUME":
      return {
        ...state,
        volume: action.payload,
      };

    default:
      return state;
  }
};

export default playerRed;
