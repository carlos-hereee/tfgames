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
      } ${data.ready ? "ready" : "not-ready"}`}>
      <div className="card-body">
        <h3 className="card-title">{data.playerName}</h3>
        <p className="card-text">Playing as {data.playerWeapon}</p>
      </div>
      {/* if ready check needed show footer */}
      <div className="card-footer text-right">
        {!room.gameStart && (
          <button
            className="btn btn-primary"
            onClick={() => playerReady(room, data.playerUuid, player)}
            disabled={data.ready || player.playerUuid === data.playerUuid}>
            Ready {data.ready && <FontAwesomeIcon icon={faCheckCircle} />}
          </button>
        )}
        <p className="card-subtitle font-weight-light">
          <small>{data.playerUuid}</small>
        </p>
      </div>
    </div>
  );
};
export default PlayerCard;
