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
    } else {
      if (!id) {
        saveLocalPlayer({
          nickname: generate({ words: 2 }).spaced,
          uid: uuidv4(),
        });
      } else {
        saveLocalPlayer({ uid: id, nickname });
      }
    }
  }, [accessToken, id]);

  const getPlayer = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithAuth.get("/users");
      dispatch({ type: "GET_PLAYER", payload: data.message });
    } catch (e) {
      // if user doesnt have an acc; remove access-token
      localStorage.removeItem("access-token");
      dispatch({ type: "IS_LOADING", payload: false });
    }
  };
  const saveLocalPlayer = (data) => {
    localStorage.setItem("take-five-player-id", data.uid);
    localStorage.setItem("take-five-player-nickname", data.nickname);
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
