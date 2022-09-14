const isLoading = (state, action) => {
  // is loading
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
const setClockLobbyData = (state, action) => {
  return {
    ...state,
    isLoading: false,
    clock: action.payload,
  };
};
const setOptions = (state, action) => {
  return {
    ...state,
    isLoading: false,
    options: action.payload,
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
    case "SET_CLOCK_LOBBY_DATA":
      return setClockLobbyData(state, action);
    case "SET_OPTIONS":
      return setOptions(state, action);
    default:
      return state;
  }
};
