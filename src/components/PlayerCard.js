import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

const PlayerCard = ({ data }) => {
  const { player, playerReady, room } = useContext(PlayerContext);

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
      <div className="card-footer">
        <button
          className="btn btn-primary"
          onClick={() => playerReady(room, data.playerUuid)}
          disabled={data.ready}>
          Ready {data.ready && <FontAwesomeIcon icon={faCheckCircle} />}
        </button>
      </div>
    </div>
  );
};
export default PlayerCard;
