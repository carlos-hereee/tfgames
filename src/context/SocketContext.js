import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);
export const SocketState = ({ children }) => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    let serverId = localStorage.getItem("take-five-id");
    if (serverId === null) {
      const newId = uuidv4();
      localStorage.setItem("take-five-id", newId);
      serverId = newId;
    }
    const newSocket = io("http://localhost:1200", {
      query: { id: serverId },
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
