const queueMatch = (state, action) => {
  return {
    ...state,
    is_loading: false,
    player: { isPlayingAgainst: action.payload, isInQueue: true },
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "QUEUE_MATCH":
      return queueMatch(state, action);
    default:
      return state;
  }
};
