const initialState = {
    isDivVisible: false, // Set to true for larger screens by default
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DIV_VISIBILITY':
        return {
          ...state,
          isDivVisible: !state.isDivVisible,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;