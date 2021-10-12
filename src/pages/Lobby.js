import generate from "project-name-generator";
import React from "react";
import shortid from "shortid";
import PlayerCard from "../components/PlayerCard";

const player1 = {
  isAMember: false,
  uid: shortid.generate(),
  name: generate({ words: 3 }).dashed,
  avatarSrc: "",
};
export default function Lobby() {
  return (
    <div className="lobby-container">
      <PlayerCard data={player1} />
      <div>Player Status</div>
      <div>Oponent Status</div>
      <div>Opponent card</div>
    </div>
  );
}
