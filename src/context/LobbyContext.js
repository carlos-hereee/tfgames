import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./LobbyReducer";
import { useSocket } from "./SocketContext";
import { PlayerContext } from "./PlayerContext";

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
  const { player } = useContext(PlayerContext);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("receive-message", (message) => addToLog(message));
    socket.on("ticket-data", (res) => ticketData(res));
    socket.on("clock-lobby-data", (res) => clockLobbyData(res));
  }, [socket]);

  const clockLobbyData = async (res) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "SET_CLOCK_LOBBY_DATA", payload: res });
  };
  const addToLog = async (message) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "ADD_TO_LOG", payload: message });
  };
  const newGame = async ({ player, game, clock }) => {
    socket.emit("new-game", { player, gameName: game, clock });
  };
  const ticketData = (ticket) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "TICKET_DATA", payload: ticket });
  };
  const cancelTicket = (ticket, clock) => {
    socket.emit("cancel-ticket", { ticket, player, clock });
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
