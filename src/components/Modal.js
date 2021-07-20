import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

const Modal = ({ data }) => {
  const { resetGame } = useContext(PlayerContext);
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
          <div className="modal-body">{data.message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              // onClick={() => resetGame()}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
