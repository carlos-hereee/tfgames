import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const PlayerContext = createContext();

export const PlayerState = ({ children }) => {
  const initialState = {
    isLoading: false,
    error: "",
    player: {
      isAMember: false,
      isInQueue: false,
      isPlaying: false,
      playerName: "",
      playerUuid: "Db4F97J6sanjBiiO6YFv",
      isPlayingAgainst: "",
    },
    room: {
      game: [
        { x: 1, y: 1, content: null },
        { x: 1, y: 2, content: null },
        { x: 1, y: 3, content: null },
        { x: 2, y: 1, content: null },
        { x: 2, y: 2, content: null },
        { x: 2, y: 3, content: null },
        { x: 3, y: 1, content: null },
        { x: 3, y: 2, content: null },
        { x: 3, y: 3, content: null },
      ],
      player1: {
        playerName: "",
        weapon: "",
        playerUuid: "",
      },
      player2: {
        playerName: "",
        weapon: "",
        playerUuid: "",
      },
      log: [],
      roomTurn: 0,
      roomMessage: "",
      playerTurn: "",
      roomUuid: "r-111",
    },
    queue: ["p-111", "p-222", "p-333"],
    gameRooms: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {}, []);

  const resetGame = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      dispatch({ type: "RESET_GAME", payload: "data" });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Could not reset game" });
    }
  };
  const queueMatch = async (vs) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      dispatch({ type: "QUEUE_MATCH", payload: vs });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Could not queue match" });
    }
  };
  const playMove = async (square, player) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      dispatch({ type: "PLAY_MOVE", payload: "" });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Could not make the move" });
    }
  };
  return (
    <PlayerContext.Provider
      value={{
        isLoading: state.isLoading,
        player: state.player,
        room: state.room,
        queueMatch,
        resetGame,
        playMove,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
