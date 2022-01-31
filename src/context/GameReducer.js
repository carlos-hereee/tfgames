const isLoading = (state, action) => {
  return {
    ...state,
    isLoading: action.payload,
  };
};
const gameUpdate = (state, action) => {
  return {
    ...state,
    isLoading: false,
    game: {
      ...state.game,
      board: action.payload,
    },
    gameStart: true,
  };
};
const gameStart = (state, action) => {
  return {
    ...state,
    isLoading: false,
    game: action.payload,
    gameStart: true,
  };
};
const postResult = (state, action) => {
  return {
    ...state,
    isLoading: false,
    gameResult: action.payload,
  };
};
const rematchResponse = (state, action) => {
  return {
    ...state,
    isLoading: false,
    rematchResponse: action.payload,
  };
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return isLoading(state, action);
    case "GAME_UPDATE":
      return gameUpdate(state, action);
    case "GAME_START":
      return gameStart(state, action);
    case "POST_RESULT":
      return postResult(state, action);
    case "REMATCH_RESPONSE":
      return rematchResponse(state, action);
    default:
      return state;
  }
};
