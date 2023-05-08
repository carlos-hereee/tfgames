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
    clock: action.payload,
    game: { ...state.game, clock: action.payload },
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
    gameResult: action.payload,
  };
};
const playerLeft = (state, action) => {
  return {
    ...state,
    isLoading: false,
    gameResult: {},
    gameStart: false,
  };
};
const opponentLeft = (state, action) => {
  return {
    ...state,
    isLoading: false,
    gameResult: {
      ...state.gameResult,
      message: action.payload.message,
      leftGame: true,
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
    case "GAME_RESET":
      return gameReset(state, action);
    case "SET_GAMENAME":
      return setGamename(state, action);
    case "SET_GAME_CLOCK_DATA":
      return setGameClockData(state, action);
    case "SET_GAME_RESULTS":
      return setGameResults(state, action);
    case "PLAYER_LEFT":
      return playerLeft(state, action);
    case "OPPONENT_LEFT":
      return opponentLeft(state, action);
    default:
      return state;
  }
};
