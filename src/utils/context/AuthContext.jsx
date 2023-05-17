import React, { createContext, useReducer, useEffect } from "react";
import { axiosWithAuth, axiosWithOutAuth, setLocalStorage } from "../fns/axios";
import { reducer } from "../reducer/AuthReducer";

export const AuthContext = createContext();

export const AuthState = ({ children }) => {
  const initialState = { isLoading: false, accessToken: "", player: {} };
  const [state, dispatch] = useReducer(reducer, initialState);

  const id = localStorage.getItem("tf-games-uid");

  useEffect(() => {
    if (id !== "undefined") {
      getAccessToken();
    } else loadPlayer();
  }, [id]);

  const getAccessToken = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithAuth.post("/users/refresh-token");
      dispatch({ type: "SET_ACCESS_TOKEN", payload: data.accessToken });
      dispatch({ type: "SET_PLAYER_DATA", payload: data.user });
      setLocalStorage(data);
    } catch {}
  };
  const loadPlayer = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithAuth.get("/custom/create-name");
      dispatch({ type: "SET_ACCESS_TOKEN", payload: "" });
      dispatch({ type: "SET_PLAYER_DATA", payload: data });
    } catch {}
  };

  const signIn = async (username, password) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithOutAuth.post("/users/login", {
        username,
        password,
      });
      setLocalStorage(data);
      dispatch({ type: "SET_ACCESS_TOKEN", payload: data.accessToken });
      dispatch({ type: "SET_PLAYER_DATA", payload: data.user });
    } catch (e) {
      dispatch({
        type: "SET_ERROR",
        payload: JSON.parse(e.request.response).message,
      });
    }
    dispatch({ type: "IS_LOADING", payload: false });
  };
  const register = async (username, password) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithOutAuth.post("/users/register", {
        username,
        password,
      });
      setLocalStorage(data);
      // dispatch({ type: "SET_LOGIN", payload: data.user });
      // history.push("/dashboard");
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
        accessToken: state.accessToken,
        getAccessToken,
        signIn,
        register,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
