import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

const PlayerCard = ({ data }) => {
  const { player } = useContext(PlayerContext);

  return (
    <div
      className={`card mb-4 p-1 shadow-sm ${
        data?.playerUuid === player?.playerUuid
          ? "player-turn--true"
          : "player-turn--false"
      }`}>
      <div className="card-body">
        <h3 className="card-title">{data.playerName}</h3>
        <p className="card-subtitle font-weight-light"> {data.playerWeapon}</p>
        <p className="card-subtitle font-weight-light"> {data.playerUuid}</p>
      </div>
    </div>
  );
};
export default PlayerCard;
