import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

const GameResultModal = () => {
  const { playAgain, room, player } = useContext(PlayerContext);

  const data =
    room.winner === player.playerUuid
      ? { modalMessage: "Congratulations! You Won", modalTitle: "VICTORY!" }
      : { modalMessage: "Lose", modalTitle: "DEFEAT!" };
  if (room.winner === "draw") {
    data.modalMessage = "Its a draw";
    data.modalTitle = "DRAW!";
  }
  return (
    <div
      className={room.showModal ? "modal d-block" : "modal d-none"}
      id={`${data.title}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${data.modalTitle}`}
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${data.modalTitle}Label`}>
              {data.modalTitle}
            </h5>
          </div>
          <div className="modal-body">
            <p>{data.modalMessage}</p>
            {/* <p>{room.rematchMessage}</p> */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => playAgain(room, player)}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameResultModal;
