import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

// show player if he is connected to the live server
export default function OnlineNav() {
  const { player } = useContext(PlayerContext);
  return (
    <div className="nav-online font-weight-bold">
      <p className="text-right m-2">
        You are {player.uid ? "Online" : "Offline"}
      </p>
    </div>
  );
}
