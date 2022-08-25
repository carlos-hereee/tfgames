import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./lobbyReducer";
import { useSocket } from "./SocketContext";
import { PlayerContext } from "./PlayerContext";

export const LobbyContext = createContext();

export const LobbyState = ({ children }) => {
  const initialState = { isLoading: false, lobby: {}, log: [], ticket: {} };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { player } = useContext(PlayerContext);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("receive-message", (message) => addToLog(message));
    socket.on("ticket-data", (res) => ticketData(res));
  }, [socket]);

  const addToLog = async (message) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "ADD_TO_LOG", payload: message });
  };
  const newGame = async ({ player, game }) => {
    socket.emit("new-game", { player, gameName: game });
  };
  const ticketData = (ticket) => {
    console.log("ticket", ticket);
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
        addToLog,
        newGame,
        cancelTicket,
      }}>
      {children}
    </LobbyContext.Provider>
  );
};
