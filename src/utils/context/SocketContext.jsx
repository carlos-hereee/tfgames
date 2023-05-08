import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketState = ({ children }) => {
  const [socket, setSocket] = useState();
  const { player } = useContext(AuthContext);

  useEffect(() => {
    if (player.uid) {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
        query: { uid: player.uid },
      });
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [player]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
