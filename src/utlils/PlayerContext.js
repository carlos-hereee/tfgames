import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import db from "../data/database.json";

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
      playerUuid: "p-111",
      isPlayingAgainst: "",
    },
    room: {
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
      roomMessage: "",
      playerTurn: "",
      roomUuid: "r-111",
    },
    queue: ["p-111", "p-222", "p-333"],
    gameRooms: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const findingMatch = async () => {
      const { isInQueue, isPlaying, playerUuid } = state.player;
      // if there in the queue and not playing
      if (isInQueue && !isPlaying) {
        // find an oponent for player
        const oponent = state.queue.filter((item) => playerUuid !== item)[0];
        // if theres an oponent in the queue a match has been found
        if (oponent) {
          // find the oponent in db
          // fill the room data, and start match
          const player1 = state.player;
          const player2 = db[oponent];
          const startMatch = {
            player1: player1,
            player2: player2,
          };
          try {
            //
            dispatch({ type: "START_MATCH", payload: startMatch });
          } catch (error) {
            dispatch({ type: "SET_ERROR", payload: "Could not find match" });
          }
        }
      }
    };
    findingMatch();
  }, [state.player.isInQueue, state.player.isPlaying]);

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
        isLoading: state.isLoading,
        player: state.player,
        room: state.room,
        queueMatch,
        resetGame,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
