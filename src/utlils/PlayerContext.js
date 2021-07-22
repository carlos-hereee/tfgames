import React, { createContext, useEffect, useReducer } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, gameRoomRef, usersRef } from "./firebase";
import { reducer } from "./reducer";
import { isPlayer1, ticTacToeRoomStart } from "./usefulFunction";

export const PlayerContext = createContext();
export const PlayerState = ({ children }) => {
  const [user] = useAuthState(auth);
  const initialState = {
    isLoading: false,
    error: "",
    player: {},
    room: {},
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

  const playAgain = async (room, player) => {
    dispatch({ type: "IS_LOADING", payload: true });
    const data = {
      ...room,
      game: ticTacToeRoomStart,
      player1ReadyCheck: false,
      player2ReadyCheck: false,
      isEmpty: false,
      winner: null,
      playerTurn: "",
      player1Weapon: "",
      player2Weapon: "",
      turn: 0,
      roomStatus: "",
    };
    isPlayer1(room, player.playerUuid)
      ? (data.player1Message = `${player.playerName} wants a rematch.`)
      : (data.player2Message = `${player.playerName} wants a rematch.`);

    try {
      // reset the room
      if (isPlayer1(room, player.playerUuid))
        gameRoomRef.doc(room.roomUuid).set({ ...data }, { merge: true });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Could not reset game" });
    }
  };
  const playMove = async (room, square) => {
    dispatch({ type: "IS_LOADING", payload: true });
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
  const addPlayer1 = async (room, player) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          player1Ready: false,
          player1IsPlaying: false,
          player1Uuid: player.playerUuid,
          player1Name: player.playerName,
        },
        { merge: true }
      );
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player1" });
    }
  };
  const addPlayer2 = async (room, player) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          player2Ready: false,
          player2IsPlaying: false,
          player2Uuid: player.playerUuid,
          player2Name: player.playerName,
        },
        { merge: true }
      );
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const playerReady = async (room, playerUuid) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      if (isPlayer1(room, playerUuid)) {
        gameRoomRef.doc(room.roomUuid).set(
          {
            ...room,
            player1Ready: true,
          },
          { merge: true }
        );
      } else {
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
    try {
    } catch (e) {}
  };
  const startGame = async (room) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      gameRoomRef
        .doc(room.roomUuid)
        .set({ ...room, gameStart: true }, { merge: true });
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const roomIsEmpty = async (room) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      gameRoomRef
        .doc(room.roomUuid)
        .set({ ...room, isEmpty: true }, { merge: true });
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const showWinnerModal = async (result, room) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          showModal: true,
          gameStart: false,
          winner: result === "draw" ? "draw" : room.playerTurn,
        },
        { merge: true }
      );
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not show winner modal" });
    }
  };
  return (
    <PlayerContext.Provider
      value={{
        isLoading: state.isLoading,
        player: state.player,
        room: state.room,
        game: state.game,
        playAgain,
        playMove,
        liveRoom,
        swapTurn,
        addPlayer1,
        addPlayer2,
        playerReady,
        startGame,
        roomIsEmpty,
        showWinnerModal,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
