const initialState = {
  token: 0,
  fdata: {}
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  if (action.type === "LOG_IN") {
    newState.token = action.token;
  }
  if (action.type === "LOG_IN") {
    newState.fdata = action.fdata;
  }

  return newState;
};

export default reducer;
