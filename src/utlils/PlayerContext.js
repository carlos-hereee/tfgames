import React, { createContext, useEffect, useReducer } from "react";
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
      playerUuid: "p-111",
      weapon: "",
      isPlayingAgainst: "",
      playerName: "",
    },
    room: {
      player1: "",
      player2: "",
      player1weapon: "",
      player2weapon: "",
      log: [],
      roomUuid: "r-111",
    },
    queue: ["p-111", "p-222", "p-333"],
    gameRooms: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // if there in the queue and not playing
    if (state.player.isInQueue && !state.player.isPlaying) {
      // find an oponent for player
      const oponent = state.queue.filter((item) => {
        console.log("item", state.player);
        return state.player.playerUuid !== item;
      })[0];
      console.log("oponent", oponent);
      // create a room and add the two in the room
    }
  }, [state.player.isInQueue]);

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
