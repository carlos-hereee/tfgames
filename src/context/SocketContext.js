import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);
export const SocketState = ({ children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    let id = localStorage.getItem("take-five-player-id");
    if (id) {
      const newSocket = io(
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_DB_BASE_URL_PRODUCTION
          : process.env.REACT_APP_DB_BASE_URL,
        {
          query: { id },
        }
      );
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
