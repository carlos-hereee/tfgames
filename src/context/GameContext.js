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
    socket.on("game-start", (game) => updateGameStart(game));
    socket.on("game-data", (game) => updateGameData(game));
    socket.on("game-results", (res) => postResults(res));
    socket.on("rematch-response", (res) => rematchResponse(res));
    socket.on("game-reset-response", (res) => gameResetResponse(res));
  }, [socket]);
  const gameResetResponse = (game) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "REMATCH_RESPONSE", payload: "" });
    dispatch({ type: "POST_RESULT", payload: "" });
    console.log("game result ", state.gameResult);
    console.log("remtach resposne ", state.rematchResponse);
    updateGameData(game);
  };
  const rematchResponse = (res) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "REMATCH_RESPONSE", payload: res });
  };
  const updateGameStart = (game) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "GAME_START", payload: game });
  };
  const updateGameData = (game) => {
    console.log("game", game);
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "GAME_UPDATE", payload: game });
  };
  const placeMark = (game, cell, player) => {
    socket.emit("place-mark", { game, cell, player });
  };
  const postResults = (result) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "POST_RESULT", payload: result });
  };
  const emitRequestRematch = (player, game) => {
    socket.emit("request-rematch", { player, game });
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
      }}>
      {children}
    </GameContext.Provider>
  );
};
