import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketState = ({ children }) => {
  const [socket, setSocket] = useState();
  let id = localStorage.getItem("tf-games-uid");

  useEffect(() => {
    console.log("id", id);
    if (id) {
      const newSocket = io(
        import.meta.VITE_NODE_ENV === "production"
          ? import.meta.VITE_DB_BASE_URL_PRODUCTION
          : import.meta.VITE_DB_BASE_URL,
        {
          query: { id },
        }
      );
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [id]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
