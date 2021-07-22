import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

const Modal = ({ data }) => {
  const { playAgain, room, player } = useContext(PlayerContext);
  return (
    <div
      className={data.show ? "modal d-block" : "modal d-none"}
      id={`${data.title}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${data.title}`}
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${data.title}Label`}>
              {data.title}
            </h5>
          </div>
          <div className="modal-body">
            <p>{data.message}</p>
            <p>{room.rematchMessage}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => playAgain(room, player)}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
