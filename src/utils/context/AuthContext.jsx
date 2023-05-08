import React, { createContext, useReducer, useEffect } from "react";
import { axiosWithAuth, axiosWithOutAuth, setLocalStorage } from "../fns/axios";
import generate from "project-name-generator";
import { reducer } from "../reducer/AuthReducer";
import { v4 } from "uuid";

export const AuthContext = createContext();

export const AuthState = ({ children }) => {
  const initialState = { isLoading: false, accessToken: "", player: {} };
  const [state, dispatch] = useReducer(reducer, initialState);

  const id = localStorage.getItem("tf-games-uid");
  const nickname = localStorage.getItem("tf-games-nickname");

  useEffect(() => {
    getAccessToken();
  }, [id]);

  const getAccessToken = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithAuth.post("/users/refresh-token");
      dispatch({ type: "SET_ACCESS_TOKEN", payload: data.accessToken });
      dispatch({ type: "SET_PLAYER_DATA", payload: data.user });
      setLocalStorage(data);
    } catch {
      let user = { nickname: generate({ words: 2 }), uid: v4() };
      dispatch({ type: "SET_PLAYER_DATA", payload: user });
      dispatch({ type: "SET_ACCESS_TOKEN", payload: "" });
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
        signUpError: state.signUpError,
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
