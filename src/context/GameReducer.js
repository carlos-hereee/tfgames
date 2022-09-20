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
      lastRenderTime: action.payload.timer,
      startTime: action.payload.startTime,
    },
  };
};
const setGameResults = (state, action) => {
  return {
    ...state,
    isLoading: false,
    gameResult: { ...state.gameResult, ...action.payload },
  };
};
const gameReset = (state, action) => {
  return {
    ...state,
    isLoading: false,
    gameResult: {},
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
    case "GAME_RESET":
      return gameReset(state, action);
    case "SET_GAMENAME":
      return setGamename(state, action);
    case "SET_GAME_CLOCK_DATA":
      return setGameClockData(state, action);
    case "SET_GAME_RESULTS":
      return setGameResults(state, action);
    default:
      return state;
  }
};
