/* eslint-disable react-hooks/exhaustive-deps */
import generate from "project-name-generator";
import React, { createContext, useEffect, useReducer } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import shortid from "shortid";
import { auth, gameRoomRef, usersRef, tauntsRef } from "./firebase";
import { reducer } from "./reducer";
import {
  isPlayer1,
  isPlayer2,
  randomBoolean,
  ticTacToeRoomStart,
} from "./usefulFunction";

export const PlayerContext = createContext();
export const PlayerState = ({ children }) => {
  const [user] = useAuthState(auth);
  const initialState = {
    isLoading: false,
    error: "",
    player: {},
    room: {},
    taunts: [],
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
  const getTaunts = async (playerUuid) => {
    tauntsRef.doc(playerUuid).onSnapshot((snap) => {
      if (!snap.exists) {
        tauntsRef.doc(playerUuid).set({ taunts: [] }, { merge: true });
        getTaunts(playerUuid);
      }
      dispatch({ type: "GET_TAUNTS", payload: snap.data() });
    });
  };
  useEffect(() => {
    if (!user) {
      // if theres no user loaded
      dispatch({
        type: "INITIALIZE_PLAYER",
        payload: {
          playerUuid: shortid.generate(),
          isAMember: false,
          isInQueue: false,
          isPlaying: false,
          isPlayingAgainst: "",
          playerName: generate({ words: 3 }).dashed,
        },
      });
    }
    if (user) {
      livePlayer(user.uid);
      getTaunts(user.uid);
    }
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

  const playAgain = async (room, player) => {
    const data = {
      ...room,
      rematchMessage: `${player.playerName} wants a rematch.`,
    };
    try {
      // reset the room
      if (isPlayer1(room, player.playerUuid)) {
        data.player1Ready = true;
        gameRoomRef.doc(room.roomUuid).set({ ...data }, { merge: true });
      } else {
        data.player2Ready = true;
        gameRoomRef.doc(room.roomUuid).set({ ...data }, { merge: true });
      }
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Could not reset game" });
    }
  };
  const playMove = async (room, square) => {
    const index = room.game.findIndex((item) => item === square);
    const gameBoard = [...room.game];
    gameBoard[index].piece =
      room.playerTurn === room.player1Uuid
        ? room.player1Weapon
        : room.player2Weapon;
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
    try {
      dispatch({ type: "INITIALIZE_ROOM", payload: room });
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Error loading room" });
    }
  };
  const swapTurn = async (room) => {
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
  const addPlayer1 = async (room, player) => {
    try {
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          inUse: true,
          player1Ready: false,
          player1IsPlaying: false,
          player1Uuid: player.playerUuid,
          player1Name: player.playerName,
          roomMessage: `${player.playerName} entered the room`,
        },
        { merge: true }
      );
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player1" });
    }
  };
  const addPlayer2 = async (room, player) => {
    try {
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          inUse: true,
          player2Ready: false,
          player2IsPlaying: false,
          player2Uuid: player.playerUuid,
          player2Name: player.playerName,
          roomMessage: `${player.playerName} entered the room`,
        },
        { merge: true }
      );
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const playerReady = async (room, playerUuid) => {
    try {
      if (isPlayer1(room, playerUuid)) {
        gameRoomRef.doc(room.roomUuid).set(
          {
            ...room,
            player1Ready: true,
          },
          { merge: true }
        );
      }
      if (isPlayer2(room, playerUuid)) {
        gameRoomRef.doc(room.roomUuid).set(
          {
            ...room,
            player2Ready: true,
          },
          { merge: true }
        );
      }
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const startGame = async (room) => {
    const playerTurnBool = randomBoolean();
    try {
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          inUse: true,
          game: ticTacToeRoomStart,
          gameStart: true,
          playerTurn: playerTurnBool ? room.player1Uuid : room.player2Uuid,
          player1Weapon: playerTurnBool ? "X" : "O",
          player2Weapon: playerTurnBool ? "O" : "X",
          roomMessage: "Game Start",
          winner: "",
          rematchMessage: "",
          turn: 0,
        },
        { merge: true }
      );
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const roomIsEmpty = async (room) => {
    try {
      gameRoomRef
        .doc(room.roomUuid)
        .set({ ...room, isEmpty: true }, { merge: true });
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const showResultModal = async (result, room) => {
    try {
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          player1Weapon: "",
          player2Weapon: "",
          turn: 0,
          player1Ready: false,
          player2Ready: false,
          gameStart: false,
          winner: result === "draw" ? "draw" : room.playerTurn,
        },
        { merge: true }
      );
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not show winner modal" });
    }
  };
  const leaveRoom = async (room, player) => {
    try {
      isPlayer1(room, player.playerUuid)
        ? gameRoomRef.doc(room.roomUuid).set(
            {
              ...room,
              player1Weapon: "",
              player1Name: "",
              player1Uuid: "",
              player2Weapon: "",
              player2Name: "",
              player2Uuid: "",
              winner: "",
              rematchMessage: `${player.playerName} left the room`,
              inUse: false,
            },
            { merge: true }
          )
        : gameRoomRef.doc(room.roomUuid).set(
            {
              ...room,
              player2Weapon: "",
              player2Name: "",
              player2Uuid: "",
              rematchMessage: `${player.playerName} left the room`,
              winner: "",
            },
            { merge: true }
          );
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not leave room" });
    }
  };
  return (
    <PlayerContext.Provider
      value={{
        isLoading: state.isLoading,
        player: state.player,
        room: state.room,
        game: state.game,
        taunts: state.taunts,
        playAgain,
        playMove,
        liveRoom,
        swapTurn,
        addPlayer1,
        addPlayer2,
        playerReady,
        startGame,
        roomIsEmpty,
        showResultModal,
        leaveRoom,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
