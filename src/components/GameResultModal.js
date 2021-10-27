import React from "react";
const GameResultModal = ({ data, modalShow, requestRematch }) => {
  const handleRematch = () => {
    requestRematch(data);
  };
  return (
    <div
      className={data.show ? "modal d-block" : "modal d-none"}
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby={data.title}
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-center">
          <div className="modal-header justify-content-center">
            <h2 className="modal-title" id={data.title}>
              {data.title}
            </h2>
          </div>
          <div className="modal-body">{data.message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => handleRematch()}>
              Rematch
            </button>
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
