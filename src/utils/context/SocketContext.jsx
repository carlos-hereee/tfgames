import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketState = ({ children }) => {
  const [socket, setSocket] = useState();
  const { player } = useContext(AuthContext);
  // let id = localStorage.getItem("tf-games-uid");

  useEffect(() => {
    console.log("id", player);
    if (player.uid) {
      const newSocket = io(import.meta.VITE_DB_BASE_URL, {
        query: { uid: player.uid },
      });
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [player]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
