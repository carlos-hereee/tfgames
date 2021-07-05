import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const PlayerContext = createContext();

export const PlayerState = ({ children }) => {
  const initialState = {
    isLoading: false,
    error: "",
    player: {
      isLoading: false,
      isLoggedIn: false,
      isPlaying: false,
      isInQueue: false,
      isPlayerTurn: false,
      isPlayingAgainst: "",
      playerName: "",
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

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
  return (
    <PlayerContext.Provider
      value={{
        player: state.player,
        isLoading: state.isLoading,
        queueMatch,
        resetGame,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
