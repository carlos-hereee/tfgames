import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./GameReducer";
import { useSocket } from "./SocketContext";
export const GameContext = createContext();

export const GameState = ({ children }) => {
  const initialState = {
    isLoading: false,
    gameStart: false,
    game: {},
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
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "GAME_START", payload: game });
  };
  return (
    <GameContext.Provider
      value={{
        isLoading: state.isLoading,
        game: state.game,
        gameStart: state.gameStart,
      }}>
      {children}
    </GameContext.Provider>
  );
};
