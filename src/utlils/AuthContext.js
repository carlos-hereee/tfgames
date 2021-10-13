import React, { createContext, useReducer } from "react";
import { axiosWithOutAuth, setAccessToken } from "./axios";
import { reducer } from "./authReducer";
export const AuthContext = createContext();

export const AuthState = ({ children }) => {
  const initialState = {
    isLoading: false,
    error: [],
    user: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
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
        signIn,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
