import generate from "project-name-generator";
import React, { useContext, useEffect } from "react";
import shortid from "shortid";
import PlayerCard from "../components/PlayerCard";
import PlayerLobbyStatus from "../components/PlayerLobbyStatus";
import { PlayerContext } from "../utlils/PlayerContext";

export default function Lobby() {
  const { player, opponent } = useContext(PlayerContext);

  return (
    <section className="lobby">
      <div className="lobby-player">
        <PlayerCard data={player} />
        <PlayerLobbyStatus />
      </div>
      {/* <PlayerCard data={opponent} /> */}
      <div>Opponent card</div>
    </section>
  );
}
