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
    game: [
      { x: 1, y: 1, piece: null, id: shortid.generate() },
      { x: 1, y: 2, piece: null, id: shortid.generate() },
      { x: 1, y: 3, piece: null, id: shortid.generate() },
      { x: 2, y: 1, piece: null, id: shortid.generate() },
      { x: 2, y: 2, piece: null, id: shortid.generate() },
      { x: 2, y: 3, piece: null, id: shortid.generate() },
      { x: 3, y: 1, piece: null, id: shortid.generate() },
      { x: 3, y: 2, piece: null, id: shortid.generate() },
      { x: 3, y: 3, piece: null, id: shortid.generate() },
    ],
    room: {
      player1Name: "",
      player2Name: "",
      player1Uuid: "",
      player2Uuid: "",
      player1Weapon: "",
      player2Weapon: "",
      playerTurn: "",
      roomMessage: "",
      roomUuid: "",
      roomTurn: 0,
    },
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
            playerName: generate({ words: 3 }).dashed,
          },
          { merge: true }
        );
      });
    }
    user?.uid && livePlayer(user.uid);
  }, [user]);

  const resetGame = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      dispatch({ type: "RESET_GAME", payload: "data" });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Could not reset game" });
    }
  };
  const playMove = async (room, player, move) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      // update board
      // dispatch({ type: "PLAY_MOVE", payload: { room, player, move } });
      // update room
      // gameRoomRef.doc(room.roomUuid).set({});
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Could not make the move" });
    }
  };

  const liveRoom = async () => {
    const notInUseGameRoom = gameRoomRef.where("inUse", "==", false).limit(1);
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      // load room state
      notInUseGameRoom.onSnapshot((snap) => {
        snap.forEach((doc) =>
          dispatch({ type: "INITIALIZE_ROOM", payload: doc.data() })
        );
      });
    } catch (e) {
      dispatch({ type: "SET_ERROR", dispatch: "Error loading room" });
    }
  };
  const enterRoom = async (room, player) => {
    const updateRoom = {
      roomMessage: "Welcome To Take Five",
    };
    if (!room.player1Uuid) {
      updateRoom.player1Uuid = player.playerUuid;
      updateRoom.player1Name = player.playerName;
    } else {
      updateRoom.player2Uuid = player.playerUuid;
      updateRoom.player2Name = player.playerName;
    }
    try {
      // add room to player
      usersRef
        .doc(player.playerUuid)
        .set(
          { isPlaying: true, isPlayingInRoom: room.roomUuid },
          { merge: true }
        );
      // add player to the room
      gameRoomRef.doc(room.roomUuid).set({ updateRoom }, { merge: true });
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
        resetGame,
        playMove,
        liveRoom,
        enterRoom,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
