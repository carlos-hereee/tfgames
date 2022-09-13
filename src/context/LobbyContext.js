import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./LobbyReducer";
import { useSocket } from "./SocketContext";
import { AuthContext } from "./AuthContext";

export const LobbyContext = createContext();

export const LobbyState = ({ children }) => {
  const initialState = {
    isLoading: false,
    lobby: {},
    log: [],
    ticket: {},
    clock: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { player } = useContext(AuthContext);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("ticket-data", (res) => ticketData(res));
    socket.on("lobby-clock-data", (res) => clockLobbyData(res));
    socket.on("receive-message", (message) => addToLog(message));
  }, [socket]);

  const clockLobbyData = (res) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "SET_CLOCK_LOBBY_DATA", payload: res });
  };
  const addToLog = (message) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "ADD_TO_LOG", payload: message });
  };
  const newGame = ({ player, game }) => {
    socket.emit("new-game", { player, gameName: game });
  };
  const ticketData = (ticket) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "TICKET_DATA", payload: ticket });
  };
  const cancelTicket = (ticket) => {
    socket.emit("cancel-ticket", { ticket, player });
  };
  return (
    <LobbyContext.Provider
      value={{
        lobby: state.lobby,
        isLoading: state.isLoading,
        log: state.log,
        ticket: state.ticket,
        clock: state.clock,
        addToLog,
        newGame,
        cancelTicket,
      }}>
      {children}
    </LobbyContext.Provider>
  );
};
