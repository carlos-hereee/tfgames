import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification";
import PlayerCard from "./PlayerCard";

const Coins = () => {
  const { player } = useContext(AuthContext);
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-row justify-content-between">
        <PlayerCard data={player} />
        <div className=" d-flex justify-content-end">
          <FontAwesomeIcon icon={faCoins} size="3x" />
          <p className="font-weight-bold coin ml-3">{player?.coins || 0}</p>
        </div>
      </div>
      <Notification />
    </div>
  );
};
export default Coins;
