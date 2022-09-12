/* eslint-disable react-hooks/exhaustive-deps */
import PlayerCard from "../components/PlayerCard";
import PlayerLobbyStatus from "../components/PlayerLobbyStatus";
import queryString from "query-string";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Logger from "../components/Logger";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Game from "../components/Game";
import { Prompt } from "react-router-dom";

export default function Lobby({ location }) {
  const { player } = useContext(AuthContext);
  const { log } = useContext(LobbyContext);
  const { game } = queryString.parse(location.search);
  const { gameStart, setGameName } = useContext(GameContext);
  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);
  // const alertUser = (e) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  // };

  useEffect(() => {
    if (game) {
      setGameName(game);
    }
  }, [game]);
  return gameStart ? (
    <Game />
  ) : (
    <section className="lobby">
      <Prompt message={() => "Are you sure you want to leave this page?"} />

      <div className="lobby-player">
        <PlayerCard data={player} />
        <PlayerLobbyStatus data={game} />
      </div>
      <div className="card logger">
        <Logger data={log} />
      </div>
    </section>
  );
}
