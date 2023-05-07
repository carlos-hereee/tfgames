import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);
export const SocketState = ({ children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    let id = localStorage.getItem("tf-games-id");
    if (id) {
      const newSocket = io(
        process.env.VITE_NODE_ENV === "production"
          ? process.env.VITE_DB_BASE_URL_PRODUCTION
          : process.env.VITE_DB_BASE_URL,
        {
          query: { id },
        }
      );
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
