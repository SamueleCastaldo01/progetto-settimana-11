// queueReducer.js

const initialState = {
    queue: [],
  };
  
  const queueReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_QUEUE':
        console.log('Adding to queue:', action.payload);
        return {
          ...state,
          queue: [...state.queue, action.payload],
        };
  
      case 'REMOVE_FROM_QUEUE':
        console.log('Removing from queue:', action.payload);
        return {
          ...state,
          queue: state.queue.filter(track => track.id !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default queueReducer;
  