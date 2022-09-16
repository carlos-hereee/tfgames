import CancelBtn from "./atoms/CancelBtn";
import RematchBtn from "./atoms/RematchBtn";

const GameResultModal = ({ data, show, setRematch, newGame }) => {
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
            {data.isPlayer1 &&
              !data.leftRes &&
              (data.players?.player1?.rematch && data.leftRes ? (
                <CancelBtn onBtnClick={setRematch} data-dismiss="modal" />
              ) : (
                data.singlePlayer && (
                  <RematchBtn onBtnClick={setRematch} data-dismiss="modal" />
                )
              ))}
            {!data.isPlayer1 &&
              !data.leftRes &&
              (data.players?.player2?.rematch && data.leftRes ? (
                <CancelBtn onBtnClick={setRematch} data-dismiss="modal" />
              ) : (
                data.singlePlayer && (
                  <RematchBtn onBtnClick={setRematch} data-dismiss="modal" />
                )
              ))}
            <button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
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
