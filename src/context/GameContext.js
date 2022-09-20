/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./GameReducer";
import { LobbyContext } from "./LobbyContext";
import { AuthContext } from "./AuthContext";
import { useSocket } from "./SocketContext";

export const GameContext = createContext();
export const GameState = ({ children }) => {
  const initialState = {
    isLoading: false,
    game: {},
    gameResult: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { player } = useContext(AuthContext);
  const { ticket } = useContext(LobbyContext);
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on("game-start", (g) => gameStart(g));
    socket.on("game-clock-data", (c) => gameClockData(c));
    socket.on("game-data", (game) => updateGameData(game));
    socket.on("game-results", (res) => postResults(res));
    socket.on("game-reset", (res) => gameReset(res));
    socket.on("rematch", (res) => rematch(res));
    socket.on("left-response", (res) => postLeftResponse(res));
    socket.on("player-left", ({ show }) => playerLeft(show));
  }, [socket]);

  const playerLeft = (show) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "SET_GAME_RESULTS", payload: show });
  };
  const gameClockData = (clock) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "SET_GAME_CLOCK_DATA", payload: clock });
  };
  const gameStart = (game) => {
    socket.emit("cancel-ticket", { ticket, player });
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "GAME_START", payload: game });
  };
  const gameReset = (game) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "GAME_REST", payload: "" });
    updateGameData(game);
  };

  const rematch = (data) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "SET_GAME_RESULTS", payload: data });
    dispatch({ type: "GAME_UPDATE", payload: data.game });
  };

  const updateGameData = (game) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "GAME_UPDATE", payload: game });
  };
  const gameUpdate = (game, motion, player) => {
    socket.emit("game-update", { game, motion, player });
  };
  const postResults = ({ result }) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "SET_GAME_RESULTS", payload: result });
  };
  const setRematch = (game, player) => socket.emit("rematch", { game, player });
  const newGame = () => {
    dispatch({ type: "IS_LOADING", payload: true });
    socket.emit("player-leave", { player, game: state.game });
    dispatch({ type: "GAME_END", payload: "" });
    socket.emit("new-game", { player, gameName: state.gameName });
  };
  const postLeftResponse = (res) => {
    dispatch({
      type: "SET_GAME_RESULTS",
      payload: { message: res.message, leftRes: true },
    });
  };
  return (
    <GameContext.Provider
      value={{
        isLoading: state.isLoading,
        game: state.game,
        gameResult: state.gameResult,
        setRematch,
        newGame,
        gameUpdate,
      }}>
      {children}
    </GameContext.Provider>
  );
};
