import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// show player if he is connected to the live server
export default function OnlineNav() {
  const { player } = useContext(AuthContext);
  return (
    <div className="nav-online font-weight-bold p-2">
      {player?.uid ? (
        <p className="text-right">
          Welcome {player.nickname} {player.isOnline ? "Online" : "Offline"}
        </p>
      ) : (
        <p className="text-right m-2">Offline</p>
      )}
    </div>
  );
}
