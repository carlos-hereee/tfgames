import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./GameReducer";
import { useSocket } from "./SocketContext";
export const GameContext = createContext();

export const GameState = ({ children }) => {
  const initialState = {
    isLoading: false,
    gameStart: false,
    game: {},
    gameResult: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("game-start", (game) => startGame(game));
    socket.on("game-data", (game) => updateGameData(game));
    socket.on("game-results", (res) => postResults(res));
  }, [socket]);
  const updateGameData = (game) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "GAME_UPDATE", payload: game });
  };
  const startGame = (game) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "GAME_START", payload: game });
  };
  const placeMark = (game, cell) => {
    socket.emit("place-mark", { game, cell });
  };
  const postResults = (result) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "POST_RESULT", payload: result });
  };
  return (
    <GameContext.Provider
      value={{
        isLoading: state.isLoading,
        gameStart: state.gameStart,
        game: state.game,
        gameResult: state.gameResult,
        placeMark,
      }}>
      {children}
    </GameContext.Provider>
  );
};
