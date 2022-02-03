import { faSyncAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const GameResultModal = ({ data, show, requestRematch }) => {
  const handleRematch = () => {
    requestRematch();
  };
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
            {/* {data.isPlayer1 && data.players.player1?.rematch ? (
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => handleRematch()}>
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                Cancel
              </button>
            ) : !data.isPlayer1 && data.players?.player2?.rematch ? (
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => handleRematch()}>
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                Cancel
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => handleRematch()}>
                <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                Rematch
              </button>
            )} */}
            {data.isPlayer1 && data.players?.player1?.rematch ? (
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => handleRematch()}>
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                Cancel
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => handleRematch()}>
                <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                Rematch
              </button>
            )}
            <button type="button" className="btn btn-success">
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameResultModal;
