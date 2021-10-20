import React, { createContext, useReducer } from "react";
import { reducer } from "./lobbyReducer";
export const LobbyContext = createContext();

export const LobbyState = ({ children }) => {
  const initialState = { isLoading: false, lobby: {}, log: [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToLobbyLog = async (message) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "ADD_TO_LOG", payload: message });
  };
  return (
    <LobbyContext.Provider
      value={{
        lobby: state.lobby,
        isLoading: state.isLoading,
        log: state.log,
        addToLobbyLog,
      }}>
      {children}
    </LobbyContext.Provider>
  );
};
