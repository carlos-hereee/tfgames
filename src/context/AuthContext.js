import React, { createContext, useReducer, useEffect } from "react";
import {
  axiosWithAuth,
  axiosWithOutAuth,
  setLocalStorage,
} from "../utils/axios";
import generate from "project-name-generator";
import { reducer } from "./reducer";
import { v4 as uuidv4 } from "uuid";

export const AuthContext = createContext();

export const AuthState = ({ children }) => {
  const initialState = {
    isLoading: false,
    accessToken: "",
    error: "",
    signUpError: "",
    player: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const id = localStorage.getItem("tf-games-id");
  const nickname = localStorage.getItem("tf-games-nickname");

  useEffect(() => {
    getAccessToken();
    if (!state.accessToken) {
      if (!id) {
        saveLocalPlayer({
          nickname: generate({ words: 2 }).spaced,
          uid: uuidv4(),
        });
      } else {
        saveLocalPlayer();
      }
    }
  }, [state.accessToken, id]);

  const getAccessToken = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithAuth.post("/users/refresh-token");
      dispatch({ type: "SET_ACCESS_TOKEN", payload: data.accessToken });
      dispatch({ type: "SET_PLAYER_DATA", payload: data.user });
      setLocalStorage(data);
    } catch {
      dispatch({ type: "SET_ACCESS_TOKEN", payload: "" });
    }
  };
  const saveLocalPlayer = (data) => {
    dispatch({ type: "IS_LOADING", payload: true });
    if (data) {
      setLocalStorage({ user: data });
      dispatch({ type: "SAVE_LOCAL_PLAYER", payload: data });
    } else {
      setLocalStorage({ user: { uid: id, nickname } });
      dispatch({ type: "SAVE_LOCAL_PLAYER", payload: { uid: id, nickname } });
    }
  };
  const signIn = async (username, password, history) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithOutAuth.post("/users/login", {
        username,
        password,
      });
      setLocalStorage(data);
      dispatch({ type: "SET_ACCESS_TOKEN", payload: data.accessToken });
      dispatch({ type: "SET_PLAYER_DATA", payload: data.user });
      history.push("/");
    } catch (e) {
      dispatch({
        type: "SET_ERROR",
        payload: JSON.parse(e.request.response).message,
      });
    }
    dispatch({ type: "IS_LOADING", payload: false });
  };
  const register = async (username, password, history) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithOutAuth.post("/users/register", {
        username,
        password,
      });
      setLocalStorage(data);
      // dispatch({ type: "SET_LOGIN", payload: data.user });
      history.push("/dashboard");
    } catch (e) {
      dispatch({
        type: "SET_SIGNUP_ERROR",
        payload: JSON.parse(e.request.response).message,
      });
    }
    dispatch({ type: "IS_LOADING", payload: false });
  };
  const logOut = async (user, history) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithAuth.delete("/users/logout", user);
      if (data.message) {
        localStorage.removeItem("tf-games-nickname");
        localStorage.removeItem("tf-games-id");
        localStorage.removeItem("access-token");
        history.push("/");
      }
    } catch (e) {
      dispatch({
        type: "SET_ERROR",
        payload: JSON.parse(e.request.response).message,
      });
    }
    dispatch({ type: "IS_LOADING", payload: false });
  };
  return (
    <AuthContext.Provider
      value={{
        isLoading: state.isLoading,
        error: state.error,
        player: state.player,
        signUpError: state.signUpError,
        accessToken: state.accessToken,
        getAccessToken,
        signIn,
        register,
        logOut,
        saveLocalPlayer,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
