import { faCheckCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

const PlayerCard = ({ data }) => {
  const { player, playerReady, room } = useContext(PlayerContext);

  return (
    <div className="card mb-3 hadow-sm">
      <div className="card-header">
        <h3 className="card-title">{data.playerName}</h3>
      </div>
      {/* if ready check needed show footer */}
      <div className="card-body d-flex flex-row">
        {player.avatarUrl ? (
          <img className="frame" src={player.avatarUrl} alt="player avatar" />
        ) : (
          <FontAwesomeIcon icon={faUser} size="5x" />
        )}
        <div className="player-info">
          <p>Elo: {data.elo}</p>
        </div>
      </div>
      {!room.gameStart && room.player1Ready && room.player2Ready && (
        <div className="card-footer">
          <button
            className="btn btn-primary m-auto"
            onClick={() => playerReady(room, data.playerUuid)}
            disabled={data.ready || player.playerUuid === data.playerUuid}>
            Ready {data.ready && <FontAwesomeIcon icon={faCheckCircle} />}
          </button>
        </div>
      )}
    </div>
  );
};
export default PlayerCard;
