import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

const PlayerCard = ({ data }) => {
  const { player, playerReady, room } = useContext(PlayerContext);
  return (
    <div className="card mb-4 p-1 shadow-sm">
      <div className="card-header">
        <h3 className="card-title">{data.playerName}</h3>
      </div>
      {/* if ready check needed show footer */}
      <div className="card-body"></div>
      <div className="card-footer">
        {!room.gameStart && room.player1Ready && room.player2Ready && (
          <button
            className="btn btn-primary m-auto"
            onClick={() => playerReady(room, data.playerUuid)}
            disabled={data.ready || player.playerUuid === data.playerUuid}>
            Ready {data.ready && <FontAwesomeIcon icon={faCheckCircle} />}
          </button>
        )}
      </div>
    </div>
  );
};
export default PlayerCard;
