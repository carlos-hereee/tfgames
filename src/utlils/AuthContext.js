import React, { createContext, useReducer } from "react";
import { axiosWithAuth, axiosWithOutAuth, setAccessToken } from "./axios";
import { reducer } from "./authReducer";
export const AuthContext = createContext();

export const AuthState = ({ children }) => {
  const initialState = {
    isLoading: false,
    error: "",
    signUpError: "",
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
      setAccessToken(data.accessToken);
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
      setAccessToken(data.accessToken);
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
