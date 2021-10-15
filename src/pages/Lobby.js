import PlayerCard from "../components/PlayerCard";
import PlayerLobbyStatus from "../components/PlayerLobbyStatus";
import queryString from "query-string";
import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

export default function Lobby({ location }) {
  const { player, opponent } = useContext(PlayerContext);
  const { game } = queryString.parse(location.search);
  return (
    <section className="lobby">
      <div className="lobby-player">
        <PlayerCard data={player} />
        <PlayerLobbyStatus data={game} />
      </div>
      <div>{opponent?.uid && <PlayerCard data={opponent} />}</div>
      {/* <PlayerCard data={opponent} /> */}
    </section>
  );
}
