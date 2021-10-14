/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useReducer } from "react";
import { axiosWithAuth } from "./axios";
import { reducer } from "./playerReducer";

export const PlayerContext = createContext();
export const PlayerState = ({ children }) => {
  const initialState = {
    isLoading: false,
    error: [],
    player: {},
    ownedAvatars: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPlayer = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithAuth.get("/users");
      dispatch({ type: "GET_PLAYER", payload: data.message });
    } catch (e) {
      dispatch({ type: "IS_LOADING", payload: false });
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        isLoading: state.isLoading,
        error: state.error,
        player: state.player,
        getPlayer,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
