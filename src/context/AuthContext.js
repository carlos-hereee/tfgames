import React, { createContext, useReducer, useEffect } from "react";
import { axiosWithAuth, axiosWithOutAuth } from "../utils/axios";
import generate from "project-name-generator";
import { reducer } from "./reducer";
import { v4 as uuidv4 } from "uuid";

export const AuthContext = createContext();

const setLocalStorage = (data) => {
  localStorage.setItem("access-token", data.accessToken);
  localStorage.setItem("take-five-player-nickname", data.user.nickname);
  localStorage.setItem("take-five-player-id", data.user.uid);
};

export const AuthState = ({ children }) => {
  const initialState = {
    isLoading: false,
    accessToken: "",
    error: "",
    signUpError: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const id = localStorage.getItem("take-five-player-id");
  const nickname = localStorage.getItem("take-five-player-nickname");
  // let accessToken = localStorage.getItem("access-token");
  // let accessToken = localStorage.getItem("access-token");

  useEffect(() => {
    if (state.accessToken) {
      console.log("accesToken", state.accessToken);
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
  }, [state.accessToken, id]);

  const getPlayer = async () => {
    console.log("getplyaer");
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
  const getAccessToken = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithOutAuth.post("/users/refresh-token");
      localStorage.setItem("take-five-player", data.user);
      localStorage.setItem("access-token", data.accessToken);
      dispatch({ type: "IS_LOADING", payload: false });
    } catch (e) {
      dispatch({ type: "IS_LOADING", payload: false });
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
        localStorage.removeItem("take-five-player-nickname");
        localStorage.removeItem("take-five-player-id");
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
        getAccessToken,
        signIn,
        register,
        logOut,
        getPlayer,
        saveLocalPlayer,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
