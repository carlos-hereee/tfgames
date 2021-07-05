import { useEffect, useState } from "react";

const Modal = ({ data }) => {
  return (
    <div
      className={data.show ? "modal d-block" : "modal d-none"}
      id={`${data.modalName}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${data.modalName}Label}`}
      aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${data.modalName}Label`}>
              {data.title}
            </h5>
          </div>
          <div className="modal-body">...</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              // onClick={() => playAgain()}
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
