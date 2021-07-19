import React, { createContext, useEffect, useReducer } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, gameRoomRef, usersRef } from "./firebase";
import { reducer } from "./reducer";
import generate from "project-name-generator";
import shortid from "shortid";

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
    room: {},
    gameRooms: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const livePlayer = async (playerUuid) => {
    try {
      // create live instance of player
      usersRef.doc(playerUuid).onSnapshot((snap) => {
        dispatch({ type: "INITIALIZE_PLAYER", payload: snap.data() });
      });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Couldnt make player instance" });
    }
  };
  useEffect(() => {
    if (!user) {
      // if theres no user loaded
      auth.signInAnonymously().then((data) => {
        usersRef.doc(data.user.uid).set(
          {
            playerUuid: data.user.uid,
            isAMember: false,
            isInQueue: false,
            isPlaying: false,
            isPlayingAgainst: "",
            // playerName: generate({ words: 3 }).dashed,
          },
          { merge: true }
        );
      });
    }
    user?.uid && livePlayer(user.uid);
  }, [user]);
  useEffect(() => {
    if (state.room.roomUuid) {
      const unsubscribe = gameRoomRef
        .doc(state.room.roomUuid)
        .onSnapshot((snap) => {
          dispatch({ type: "INITIALIZE_ROOM", payload: snap.data() });
        });
      return () => unsubscribe();
    }
  }, [state.room.roomUuid]);

  const resetGame = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      dispatch({ type: "RESET_GAME", payload: "data" });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Could not reset game" });
    }
  };
  const playMove = async (room, square) => {
    dispatch({ type: "IS_LOADING", payload: true });
    const index = room.game.findIndex((item) => item === square);
    const gameBoard = [...room.game];
    gameBoard[index].piece = room.playerTurn === room.player1Uuid ? "X" : "O";
    // if its player1's turn then the content in the room is X else O
    try {
      // update game board
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          game: gameBoard,
        },
        { merge: true }
      );
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Could not make the move" });
    }
  };
  const liveRoom = async (room) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      dispatch({ type: "INITIALIZE_ROOM", payload: room });
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Error loading room" });
    }
  };
  const swapTurn = async (room) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          playerTurn:
            room.playerTurn === room.player1Uuid
              ? room.player2Uuid
              : room.player1Uuid,
          turn: room.turn + 1,
        },
        { merge: true }
      );
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Error swaping turns" });
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        isLoading: state.isLoading,
        player: state.player,
        room: state.room,
        game: state.game,
        resetGame,
        playMove,
        liveRoom,
        swapTurn,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
