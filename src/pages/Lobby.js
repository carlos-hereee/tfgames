import generate from "project-name-generator";
import React, { useContext, useEffect } from "react";
import shortid from "shortid";
import PlayerCard from "../components/PlayerCard";
import { AuthContext } from "../utlils/AuthContext";

export default function Lobby() {
  const { user } = useContext(AuthContext);
  return (
    <div className="lobby-container">
      <PlayerCard data={user} />
      <div>Player Status</div>
      <div>Oponent Status</div>
      <div>Opponent card</div>
    </div>
  );
}
