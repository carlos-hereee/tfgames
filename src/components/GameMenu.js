import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
// import RandomName from "./RandomName";

const GameMenu = () => {
  const { player, vsFriends, vsComputer, vsPlayer } = useContext(PlayerContext);
  return (
    <div className="card">
      <div className="card-body text-center">
        <h3 className="card-title">Play</h3>
        <div class="alert alert-danger" role="alert">
          Some game modes are under development
        </div>
        <div
          className="d-grid gap-2 col-6 mx-auto"
          aria-label="play vs computer or friend">
          <button
            className="btn btn-secondary btn-lg btn-block"
            disabled
            onClick={() => vsComputer(player.playerUuid)}>
            Computer
          </button>
          <button
            className="btn btn-secondary btn-lg btn-block"
            disabled
            onClick={() => vsPlayer(player.playerUuid)}>
            PVP
          </button>
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={() => vsFriends(player.playerUuid)}>
            Friend
          </button>
        </div>
      </div>
      {/* <RandomName /> */}
    </div>
  );
};
export default GameMenu;
