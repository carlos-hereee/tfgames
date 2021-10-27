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
    rematchResponse: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("game-start", (game) => startGame(game));
    socket.on("game-data", (game) => updateGameData(game));
    socket.on("game-results", (res) => postResults(res));
    socket.on("rematch-response", (res) => rematchResponse(res));
  }, [socket]);
  const rematchResponse = (res) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "REMATCH_RESPONSE", payload: res });
  };
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
  const emitRequestRematch = (player, game) => {
    socket.emit("request-rematch", { player, game });
  };
  const resetRematch = () => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "REMATCH_RESPONSE", payload: "" });
    dispatch({ type: "POST_RESULT", payload: "" });
  };
  return (
    <GameContext.Provider
      value={{
        isLoading: state.isLoading,
        gameStart: state.gameStart,
        game: state.game,
        gameResult: state.gameResult,
        rematchResponse: state.rematchResponse,
        placeMark,
        emitRequestRematch,
        resetRematch,
      }}>
      {children}
    </GameContext.Provider>
  );
};
