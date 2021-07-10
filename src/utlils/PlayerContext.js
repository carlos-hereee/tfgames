import React, { createContext, useEffect, useReducer } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { reducer } from "./reducer";

export const PlayerContext = createContext();
export const PlayerState = ({ children }) => {
  const [user] = useAuthState(auth);

  const initialState = {
    isLoading: false,
    error: "",
    player: {
      isAMember: false,
      isInQueue: false,
      isPlaying: false,
      playerName: "",
      playerUuid: "",
      isPlayingAgainst: "",
    },
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
      roomTurn: 0,
      roomMessage: "",
      playerTurn: "",
      roomUuid: "r-111",
    },
    gameRooms: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!user) {
      auth.signInAnonymously().then((data) => console.log("data", data));
    }
  }, [user]);

  const resetGame = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      dispatch({ type: "RESET_GAME", payload: "data" });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Could not reset game" });
    }
  };
  // const queueMatch = async (vs) => {
  //   dispatch({ type: "IS_LOADING", payload: true });
  //   try {
  //     dispatch({ type: "QUEUE_MATCH", payload: vs });
  //   } catch (error) {
  //     dispatch({ type: "SET_ERROR", payload: "Could not queue match" });
  //   }
  // };
  const playMove = async (square, player) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      dispatch({ type: "PLAY_MOVE", payload: "" });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Could not make the move" });
    }
  };

  const liveRoom = async (room) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      // load room state
      dispatch({ type: "INITIALIZE_ROOM", payload: room });
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Error loading room" });
    }
  };
  return (
    <PlayerContext.Provider
      value={{
        isLoading: state.isLoading,
        player: state.player,
        room: state.room,
        game: state.game,
        // queueMatch,
        resetGame,
        playMove,
        liveRoom,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
