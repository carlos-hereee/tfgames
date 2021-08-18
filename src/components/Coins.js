import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

const Coins = () => {
  const { player } = useContext(PlayerContext);
  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-end">
        <FontAwesomeIcon icon={faCoins} size="3x" />
        <p className="font-weight-bold coin ml-3">{player?.coins || 0}</p>
      </div>
    </div>
  );
};
export default Coins;
