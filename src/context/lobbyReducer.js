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
const ticketData = (state, action) => {
  return {
    ...state,
    isLoading: false,
    ticket: action.payload,
  };
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return isLoading(state, action);
    case "ADD_TO_LOG":
      return addToLog(state, action);
    case "TICKET_DATA":
      return ticketData(state, action);
    default:
      return state;
  }
};
