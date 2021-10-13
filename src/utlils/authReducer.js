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
    error: [...state.error, action.payload],
  };
};
const getUser = (state, action) => {
  return {
    ...state,
    isLoading: false,
    user: action.payload,
  };
};
const setLogin = (state, action) => {
  return {
    ...state,
    isLoading: false,
    user: action.payload,
  };
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return isLoading(state, action);
    case "SET_ERROR":
      return setError(state, action);
    case "GET_USER":
      return getUser(state, action);
    case "SET_LOGIN":
      return setLogin(state, action);
    default:
      return state;
  }
};
