/* eslint-disable react-hooks/exhaustive-deps */
import PlayerCard from "../components/PlayerCard";
import LobbyOptions from "../components/LobbyOptions";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logger from "../components/Logger";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Game from "../components/Game";
import { Prompt } from "react-router-dom";

export default function Lobby({ history }) {
  const { player } = useContext(AuthContext);
  const { log, gameName } = useContext(LobbyContext);
  const { game } = useContext(GameContext);

  if (!gameName) {
    history.push("/");
  }
  return game.loobyId ? (
    <Game />
  ) : (
    <main className="lobby">
      {/* <Prompt message={() => "Are you sure you want to leave this page?"} /> */}
      <div className="lobby-player">
        <PlayerCard data={player} />
        <LobbyOptions name={gameName} />
      </div>
      <div className="card logger">
        <Logger data={log} />
      </div>
    </main>
  );
}
