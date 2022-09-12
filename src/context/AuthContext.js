import React, { createContext, useReducer } from "react";
import { axiosWithAuth, axiosWithOutAuth } from "../utils/axios";
import { reducer } from "./authReducer";
export const AuthContext = createContext();

export const AuthState = ({ children }) => {
  const initialState = {
    isLoading: false,
    error: "",
    signUpError: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
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
  const signIn = async (username, password) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithOutAuth.post("/users/login", {
        username,
        password,
      });
      localStorage.setItem("take-five-player", data.user);
      localStorage.setItem("access-token", data.accessToken);
      // dispatch({ type: "SET_LOGIN", payload: data.user });
    } catch (e) {
      dispatch({
        type: "SET_ERROR",
        payload: JSON.parse(e.request.response).message,
      });
    }
  };
  const register = async (username, password) => {
    dispatch({ type: "IS_LOADING", payload: true });

    try {
      const { data } = await axiosWithOutAuth.post("/users/register", {
        username,
        password,
      });
      localStorage.setItem("take-five-player", data.user);
      localStorage.setItem("access-token", data.accessToken);
      dispatch({ type: "SET_LOGIN", payload: data.user });
    } catch (e) {
      dispatch({
        type: "SET_SIGNUP_ERROR",
        payload: JSON.parse(e.request.response).message,
      });
    }
  };
  const logOut = async (user) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithAuth.delete("/users/logout", user);
      console.log("data", data);
      if (data.message) {
        localStorage.removeItem("take-five-player-nickname");
        localStorage.removeItem("take-five-player-id");
        localStorage.removeItem("access-token");
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
        signUpError: state.signUpError,
        getAccessToken,
        signIn,
        register,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
