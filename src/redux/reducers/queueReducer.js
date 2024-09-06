const initialState = {
    queue: [], // Inizialmente la coda è vuota
  };
  
  const queueReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_QUEUE":
        return {
          ...state,
          queue: [...state.queue, action.payload],
        };
  
      case "REMOVE_FROM_QUEUE":
        return {
          ...state,
          queue: state.queue.filter(track => track.id !== action.payload.id),
        };
  
      case "CLEAR_QUEUE":
        return {
          ...state,
          queue: [],
        };
  
      default:
        return state;
    }
  };
  
  export default queueReducer;