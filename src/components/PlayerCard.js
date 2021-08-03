import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

const src = "/src/assests/Take5-linda-2.png";

const PlayerCard = ({ data }) => {
  const { player, playerReady, room } = useContext(PlayerContext);
  return (
    <div className="card mb-4 p-1 shadow-sm">
      <div className="card-header">
        <h3 className="card-title">{data.playerName}</h3>
      </div>
      {/* if ready check needed show footer */}
      <div className="card-body">
        <div className="card p-2 d-flex flex-row">
          <img className="avatar" src={src} alt="avatar" />
          <div className="player-info">
            <p>Elo: {data.elo}</p>
          </div>
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
