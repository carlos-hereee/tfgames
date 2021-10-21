const isLoading = (state, action) => {
  return {
    ...state,
    isLoading: action.payload,
  };
};
const setError = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload,
  };
};
const getPlayer = (state, action) => {
  return {
    ...state,
    is_loading: false,
    player: action.payload,
  };
};
const saveLocalPlayer = (state, action) => {
  return {
    ...state,
    isLoading: false,
    player: action.payload,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return isLoading(state, action);
    case "SET_ERROR":
      return setError(state, action);
    case "GET_PLAYER":
      return getPlayer(state, action);
    case "SAVE_LOCAL_PLAYER":
      return saveLocalPlayer(state, action);
    default:
      return state;
  }
};
