import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

const GameMenu = () => {
  const { queueMatch } = useContext(PlayerContext);
  return (
    <div className="card">
      <div className="card-body text-center">
        <h3 className="card-title">Play</h3>
        <div
          className="d-grid gap-2 col-6 mx-auto"
          aria-label="play vs computer or friend">
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={() => queueMatch("vs-computer")}>
            Computer
          </button>
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={() => queueMatch("vs-friend")}>
            Friend
          </button>
        </div>
      </div>
    </div>
  );
};
export default GameMenu;
