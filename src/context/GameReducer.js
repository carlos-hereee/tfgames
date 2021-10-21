const isLoading = (state, action) => {
  return {
    ...state,
    isLoading: action.payload,
  };
};
const gameStart = (state, action) => {
  return {
    ...state,
    game: action.payload,
    gameStart: true,
  };
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return isLoading(state, action);
    case "GAME_START":
      return gameStart(state, action);
    default:
      return state;
  }
};
