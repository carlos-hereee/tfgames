import { faCheckCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import { storageRef } from "../utlils/firebase";
import { useEffect, useState } from "react/cjs/react.development";

const PlayerCard = ({ data }) => {
  const { player, playerReady, room } = useContext(PlayerContext);
  const [url, setUrl] = useState();

  useEffect(() => {
    if (player?.avatarPath) {
      storageRef
        .child(player.avatarPath)
        .getDownloadURL()
        .then((url) => setUrl(url));
    }
  }, [player?.avatarPath]);
  console.log("player", player);
  return (
    <div className="card mb-3 hadow-sm">
      <div className="card-header">
        <h3 className="card-title">{data.playerName}</h3>
      </div>
      {/* if ready check needed show footer */}
      <div className="card-body d-flex flex-row">
        {url ? (
          <img className="frame" src={url} alt="player avatar" />
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
