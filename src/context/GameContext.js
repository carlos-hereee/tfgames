import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { useSocket } from "./SocketContext";
export const GameContext = createContext();

export const GameState = ({ children }) => {
  const initialState = {
    isLoading: false,
    lobby: {},
    game: {},
    log: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("game-start", (game) => {
      startGame(game);
    });
  }, [socket]);
  const startGame = (game) => {
    console.log(game);
  };
  const toLobby = (game) => {};
  return (
    <GameContext.Provider
      value={{ isLoading: state.isLoading, game: state.game }}>
      {children}
    </GameContext.Provider>
  );
};
