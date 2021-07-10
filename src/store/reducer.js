const initialState = {
  liked: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIKED": {
      const myState = { ...state };
      myState.liked = action.liked;
      return myState;
    }

    default:
      return state;
  }
};

export default reducer;
