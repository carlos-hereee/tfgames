import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);
export const SocketState = ({ children }) => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    let id = localStorage.getItem("take-five-player-id");
    if (id) {
      const newSocket = io("http://localhost:1200", {
        query: { id },
      });
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
