import PlayerCard from "../components/PlayerCard";
import PlayerLobbyStatus from "../components/PlayerLobbyStatus";
import queryString from "query-string";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Logger from "../components/Logger";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Game from "../components/Game";

export default function Lobby({ location }) {
  const { player } = useContext(PlayerContext);
  const { log } = useContext(LobbyContext);
  const { game } = queryString.parse(location.search);
  const { gameStart } = useContext(GameContext);

  return gameStart ? (
    <Game />
  ) : (
    <section className="lobby">
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
