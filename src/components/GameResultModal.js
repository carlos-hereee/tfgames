import { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { PlayerContext } from "../utlils/PlayerContext";

const GameResultModal = ({ data }) => {
  const { playAgain, room, player } = useContext(PlayerContext);
  const [gameStatus, setGameStatus] = useState({
    show: false,
    message: "",
    title: "",
  });

  useEffect(() => {
    if (room.winner) {
      if (room.winner === player.playerUuid) {
        setGameStatus({
          show: true,
          modalMessage: "Congratulations! You Won",
          modalTitle: "VICTORY!",
        });
      }
      if (room.winner !== player.playerUuid && room.winner !== "draw") {
        setGameStatus({
          show: true,
          modalMessage: "You were defeated, Rematch?",
          modalTitle: "DEFEAT!",
        });
      }
      if (room.winner === "draw") {
        setGameStatus({
          show: true,
          modalMessage: "It is a tie.",
          modalTitle: "DRAW!",
        });
      }
    }
  }, [room.winner]);

  const handlePlayAgain = (room, player) => {
    setGameStatus({ ...gameStatus, show: false });
    playAgain(room, player);
  };
  return (
    <div
      className={gameStatus.show ? "modal d-block" : "modal d-none"}
      id={`${gameStatus.title}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${gameStatus.modalTitle}`}
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${gameStatus.modalTitle}Label`}>
              {gameStatus.modalTitle}
            </h5>
          </div>
          <div className="modal-body">
            <p>{gameStatus.modalMessage}</p>
            {/* <p>{room.rematchMessage}</p> */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => handlePlayAgain(room, player)}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameResultModal;
