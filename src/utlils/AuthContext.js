import React, { createContext, useReducer } from "react";
import { axiosWithAuth, axiosWithOutAuth, setAccessToken } from "./axios";
import { reducer } from "./authReducer";
export const AuthContext = createContext();

export const AuthState = ({ children }) => {
  const initialState = {
    isLoading: false,
    error: [],
    user: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const getUser = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithAuth.get("/users");
      dispatch({ type: "GET_USER", payload: data.message });
    } catch (e) {
      dispatch({ type: "IS_LOADING", payload: false });
    }
  };
  const getAccessToken = async () => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axiosWithOutAuth.post("/users/refresh-token");
      setAccessToken(data.accessToken);
      getUser();
      dispatch({ type: "IS_LOADING", payload: false });
    } catch {
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
      console.log("data.user", data.user);
      setAccessToken(data.accessToken);
      dispatch({ type: "SET_LOGIN", payload: data.user });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Sign error try again later" });
    }
  };
  const register = async (email, password) => {
    try {
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Sign error try again later" });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isLoading: state.isLoading,
        error: state.error,
        user: state.user,
        getAccessToken,
        getUser,
        signIn,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
