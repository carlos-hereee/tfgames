/* eslint-disable react-hooks/exhaustive-deps */
import generate from "project-name-generator";
import React, { createContext, useEffect, useReducer } from "react";
import { accessToken, axiosWithAuth } from "../utils/axios";
import { reducer } from "./playerReducer";
import { v4 as uuidv4 } from "uuid";

export const PlayerContext = createContext();
export const PlayerState = ({ children }) => {
  const initialState = {
    isLoading: false,
    error: [],
    player: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const id = localStorage.getItem("take-five-player-id");
  const nickname = localStorage.getItem("take-five-player-nickname");

  useEffect(() => {
    if (accessToken) {
      getPlayer();
    }
    if (id) {
      saveLocalPlayer({ uid: id, nickname });
    }
    if (!accessToken && !id) {
      const userData = {
        nickname: generate({ words: 2 }).spaced,
        uid: uuidv4(),
      };
      localStorage.setItem("take-five-player-id", userData.uid);
      localStorage.setItem("take-five-player-nickname", userData.nickname);
      saveLocalPlayer(userData);
    }
  }, [accessToken, id]);
  const getPlayer = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithAuth.get("/users");
      dispatch({ type: "GET_PLAYER", payload: data.message });
    } catch (e) {
      dispatch({ type: "IS_LOADING", payload: false });
    }
  };
  const saveLocalPlayer = (data) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "SAVE_LOCAL_PLAYER", payload: data });
  };
  return (
    <PlayerContext.Provider
      value={{
        isLoading: state.isLoading,
        error: state.error,
        player: state.player,
        getPlayer,
        saveLocalPlayer,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
