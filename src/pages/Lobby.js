import PlayerCard from "../components/PlayerCard";
import PlayerLobbyStatus from "../components/PlayerLobbyStatus";
import queryString from "query-string";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Logger from "../components/Logger";
import { LobbyContext } from "../context/LobbyContext";

export default function Lobby({ location }) {
  const { player, opponent } = useContext(PlayerContext);
  const { lobby, log } = useContext(LobbyContext);
  const { game } = queryString.parse(location.search);

  return (
    <section className="lobby">
      <div className="lobby-player">
        <PlayerCard data={player} />
        <PlayerLobbyStatus data={game} />
      </div>
      <div className="card logger">
        <Logger data={log} />
      </div>
      {/* {opponent?.uid && <PlayerCard data={opponent} />} */}

      {/* <PlayerCard data={opponent} /> */}
    </section>
  );
}
