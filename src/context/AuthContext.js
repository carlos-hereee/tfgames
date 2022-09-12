import React, { createContext, useReducer } from "react";
import { axiosWithOutAuth } from "../utils/axios";
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
      dispatch({ type: "SET_LOGIN", payload: data.user });
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
  return (
    <AuthContext.Provider
      value={{
        isLoading: state.isLoading,
        error: state.error,
        signUpError: state.signUpError,
        getAccessToken,
        signIn,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
