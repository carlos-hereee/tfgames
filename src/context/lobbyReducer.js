const isLoading = (state, action) => {
  return {
    ...state,
    isLoading: action.payload,
  };
};
const addToLog = (state, action) => {
  return {
    ...state,
    isLoading: false,
    log: [...state.log, action.payload],
  };
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return isLoading(state, action);
    case "ADD_TO_LOG":
      return addToLog(state, action);
    default:
      return state;
  }
};
