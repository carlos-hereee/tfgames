/* eslint-disable react-hooks/exhaustive-deps */
import PlayerCard from "../components/PlayerCard";
import LobbyOptions from "../components/LobbyOptions";
import queryString from "query-string";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Logger from "../components/Logger";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Game from "../components/Game";
import { Prompt } from "react-router-dom";
import { games } from "../utils/usefulFunction";

export default function Lobby({ location }) {
  const { player } = useContext(AuthContext);
  const { log, options, setOptions } = useContext(LobbyContext);
  const { game } = queryString.parse(location.search);
  const { gameStart, setGameName } = useContext(GameContext);

  useEffect(() => {
    if (game) {
      setGameName(game);
      // get options for game
      if (!options.length) {
        // get initial options
        const idx = games.map((g) => g.name).indexOf(game);
        setOptions(games[idx].defaultOptions);
      }
    }
  }, [game]);
  return gameStart ? (
    <Game />
  ) : (
    <section className="lobby">
      {/* <Prompt message={() => "Are you sure you want to leave this page?"} /> */}
      <div className="lobby-player">
        <PlayerCard data={player} />
        <LobbyOptions name={game} />
      </div>
      <div className="card logger">
        <Logger data={log} />
      </div>
    </section>
  );
}
