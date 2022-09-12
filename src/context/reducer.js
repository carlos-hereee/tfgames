const setError = (state, action) => {
  return {
    ...state,
    error: [...state.error, action.payload],
  };
};
const setAccessToken = (state, action) => {
  return {
    ...state,
    isLoading: false,
    accessToken: action.payload,
  };
};
const getPlayer = (state, action) => {
  return {
    ...state,
    is_loading: false,
    player: action.payload,
  };
};

const queueMatch = (state, action) => {
  return {
    ...state,
    isLoading: false,
    player: {
      ...state.player,
      isPlayingAgainst: action.payload,
      isInQueue: true,
    },
  };
};
const playMove = (state, action) => {
  return {
    ...state,
    isLoading: false,
    game: action.payload,
  };
};
const initPlayer = (state, action) => {
  return {
    ...state,
    isLoading: false,
    player: action.payload,
  };
};
const initRoom = (state, action) => {
  return {
    ...state,
    isLoading: false,
    room: action.payload,
  };
};
const getTaunts = (state, action) => {
  return {
    ...state,
    isLoading: false,
    taunts: action.payload.taunts,
  };
};
const getOwnedAvatars = (state, action) => {
  return {
    ...state,
    isLoading: false,
    ownedAvatars: [...state.ownedAvatars, action.payload],
  };
};
const saveLocalPlayer = (state, action) => {
  return {
    ...state,
    isLoading: false,
    player: action.payload,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return setError(state, action);
    case "SET_ACCESS_TOKEN":
      return setAccessToken(state, action);
    case "QUEUE_MATCH":
      return queueMatch(state, action);
    case "PLAY_MOVE":
      return playMove(state, action);
    case "INITIALIZE_PLAYER":
      return initPlayer(state, action);
    case "INITIALIZE_ROOM":
      return initRoom(state, action);
    case "GET_TAUNTS":
      return getTaunts(state, action);
    case "GET_OWNED_AVATARS":
      return getOwnedAvatars(state, action);
    case "GET_PLAYER":
      return getPlayer(state, action);
    case "SAVE_LOCAL_PLAYER":
      return saveLocalPlayer(state, action);
    default:
      return state;
  }
};
