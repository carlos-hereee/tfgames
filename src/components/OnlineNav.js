import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

// show player if he is connected to the live server
export default function OnlineNav() {
  const { player } = useContext(PlayerContext);
  return (
    <div className="nav-online font-weight-bold p-2">
      {player.uid ? (
        <>
          <p className="text-right">Welcome Back {player.nickname}</p>
          <p className="text-right">Online</p>
        </>
      ) : (
        <p className="text-right m-2">Offline</p>
      )}
    </div>
  );
}
