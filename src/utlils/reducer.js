import { randomBoolean } from "./usefulFunction";

const queueMatch = (state, action) => {
  return {
    ...state,
    is_loading: false,
    player: {
      ...state.player,
      isPlayingAgainst: action.payload,
      isInQueue: true,
    },
  };
};

const startMatch = (state, action) => {
  return {
    ...state,
    room: {
      ...state.room,
      player1: action.payload.player1,
      player2: action.payload.player2,
      playerTurn: randomBoolean()
        ? action.payload.player1.playerUuid
        : action.payload.player2.playerUuid,
    },
    player: {
      ...state.player,
      isPlaying: true,
      isPlayingAgainst: action.payload.player2.playerUuid,
    },
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
    case "START_MATCH":
      return startMatch(state, action);
    default:
      return state;
  }
};
