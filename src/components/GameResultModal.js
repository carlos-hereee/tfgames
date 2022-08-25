import { faSyncAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameResultModal = ({ data, show, requestRematch, newGame }) => {
  return (
    <div
      className={show ? "modal d-block" : "d-none"}
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby={data.title}
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-center modal-results">
          <div className="justify-content-center">
            <h2 className="modal-title text-white" id={data.title}>
              {data.title}
            </h2>
          </div>
          <p className="text-white">{data.message}</p>
          <div className="modal-footer">
            {data.isPlayer1 && !data.leftRes ? (
              data.players?.player1?.rematch && data.leftRes ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => requestRematch()}>
                  <FontAwesomeIcon icon={faTimes} className="mr-2" />
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => requestRematch()}>
                  <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                  Rematch
                </button>
              )
            ) : null}
            {!data.isPlayer1 && !data.leftRes ? (
              data.players?.player2?.rematch && data.leftRes ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => requestRematch()}>
                  <FontAwesomeIcon icon={faTimes} className="mr-2" />
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => requestRematch()}>
                  <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                  Rematch
                </button>
              )
            ) : null}
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => newGame()}>
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameResultModal;
