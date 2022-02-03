import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./lobbyReducer";
import { useSocket } from "./SocketContext";
export const LobbyContext = createContext();

export const LobbyState = ({ children }) => {
  const initialState = { isLoading: false, lobby: {}, log: [] };
  const [state, dispatch] = useReducer(reducer, initialState);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("receive-message", (message) => {
      addToLog(message);
    });
  }, [socket]);

  const addToLog = async (message) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "ADD_TO_LOG", payload: message });
  };
  const newGame = async ({ player, game }) => {
    socket.emit("new-game", { player, game });
  };
  return (
    <LobbyContext.Provider
      value={{
        lobby: state.lobby,
        isLoading: state.isLoading,
        log: state.log,
        addToLog,
        newGame,
      }}>
      {children}
    </LobbyContext.Provider>
  );
};
