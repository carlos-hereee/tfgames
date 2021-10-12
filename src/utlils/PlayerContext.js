/* eslint-disable react-hooks/exhaustive-deps */
import generate from "project-name-generator";
import React, { createContext, useReducer } from "react";
import shortid from "shortid";
import { reducer } from "./reducer";
import {
  isPlayer1,
  isPlayer2,
  randomBoolean,
  ticTacToeRoomStart,
} from "./usefulFunction";

export const PlayerContext = createContext();
export const PlayerState = ({ children }) => {
  const initialState = {
    isLoading: false,
    error: [],
    player: {
      isAMember: false,
      playerUuid: shortid.generate(),
      playerName: generate({ words: 3 }).dashed,
    },
    room: {},
    ownedAvatars: [],
    taunts: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const livePlayer = async (playerUuid) => {
    try {
      // create live instance of player
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Couldnt make player instance" });
    }
  };
  const loadAvatar = async (playerUuid) => {
    try {
      // create live instance of player
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Couldnt load avatars" });
    }
  };
  // useEffect(() => {
  //   if (user?.uid) {
  //     livePlayer(user.uid);
  //     loadAvatar(user.uid);
  //   }
  // }, [user]);
  // useEffect(() => {
  //   if (state.room.roomUuid) {
  //     const unsubscribe = gameRoomRef
  //       .doc(state.room.roomUuid)
  //       .onSnapshot((snap) => {
  //         dispatch({ type: "INITIALIZE_ROOM", payload: snap.data() });
  //       });
  //     return () => unsubscribe();
  //   }
  // }, [state.room.roomUuid]);
  // const signIn = async (email, password) => {
  //   try {
  //     await auth.signInWithEmailAndPassword(email, password);
  //     // history.push("/profile");
  //   } catch (e) {
  //     dispatch({ type: "SET_ERROR", dispatch: "Sign error try again later" });
  //   }
  // };
  // const register = async (email, password) => {
  //   try {
  //     const { user } = await auth.createUserWithEmailAndPassword(
  //       email,
  //       password
  //     );
  //     usersRef.doc(user.uid).set(
  //       {
  //         isAMember: true,
  //         playerUuid: user.uid,
  //         playerName: generate({ words: 3 }).dashed,
  //       },
  //       { merge: true }
  //     );
  //   } catch (e) {
  //     dispatch({ type: "SET_ERROR", dispatch: "Sign error try again later" });
  //   }
  // };
  const setError = async (message) => {
    try {
      dispatch({ type: "SET_ERROR", payload: message });
    } catch {
      dispatch({ type: "SET_ERROR", payload: message });
    }
  };
  const clearError = () => {
    state.error.pop();
  };
  const playAgain = async (room, player) => {
    const data = {
      ...room,
      rematchMessage: `${player.playerName} wants a rematch.`,
    };
    try {
      // reset the room
      if (isPlayer1(room, player.playerUuid)) {
        data.player1Ready = true;
      } else {
        data.player2Ready = true;
      }
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Could not reset game" });
    }
  };
  const playMove = async (room, square) => {
    // if its player1's turn then the content in the room is X else O
    try {
      // update game board
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
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Error swaping turns" });
    }
  };
  const addPlayer1 = async (room, player) => {
    try {
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player1" });
    }
  };
  const addPlayer2 = async (room, player) => {
    try {
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const playerReady = async (room, playerUuid) => {
    try {
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const startGame = async (room) => {
    const playerTurnBool = randomBoolean();
    try {
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const roomIsEmpty = async (room) => {
    try {
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not add player2" });
    }
  };
  const showResultModal = async (result, room) => {
    try {
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not show winner modal" });
    }
  };
  const leaveRoom = async (room, player) => {
    try {
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not leave room" });
    }
  };
  const purchaseAvatar = async (player, avatar) => {
    try {
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Could not leave room" });
    }
  };
  return (
    <PlayerContext.Provider
      value={{
        isLoading: state.isLoading,
        error: state.error,
        player: state.player,
        room: state.room,
        game: state.game,
        taunts: state.taunts,
        ownedAvatars: state.ownedAvatars,
        setError,
        clearError,
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
        // signIn,
        // register,
        purchaseAvatar,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
