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
    game: action.payload,
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
const gameEnd = (state, action) => {
  return {
    ...state,
    isLoading: false,
    gameStart: false,
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
const setGamename = (state, action) => {
  return {
    ...state,
    isLoading: true,
    gameName: action.payload,
  };
};
const setGameClockData = (state, action) => {
  return {
    ...state,
    isLoading: false,
    game: {
      ...state.game,
      lastRenderTime: action.payload,
    },
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
    case "GAME_END":
      return gameEnd(state, action);
    case "POST_RESULT":
      return postResult(state, action);
    case "REMATCH_RESPONSE":
      return rematchResponse(state, action);
    case "SET_GAMENAME":
      return setGamename(state, action);
    case "SET_GAME_CLOCK_DATA":
      return setGameClockData(state, action);
    default:
      return state;
  }
};
