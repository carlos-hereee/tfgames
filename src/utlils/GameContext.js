import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";
export const GameContext = createContext();

export const GameState = ({ children }) => {
  const initialState = {
    isLoading: false,
    lobby: {},
    game: {
      name: "",
      status: "",
      playerTurn: "",
      message: "",
      roomId: "",
    },
    player1: {
      name: "",
      uid: "",
      elo: "",
    },
    player2: {
      name: "",
      uid: "",
      elo: "",
    },
    log: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const toLobby = (game) => {};
  return (
    <GameContext.Provider
      value={{ isLoading: state.isLoading, game: state.game }}>
      {children}
    </GameContext.Provider>
  );
};
