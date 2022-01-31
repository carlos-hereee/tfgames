import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const GameResultModal = ({ data, show, requestRematch, modalShow }) => {
  console.log("data, show", data, show);
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
          <div className="modal-header justify-content-center">
            <h2 className="modal-title" id={data.title}>
              {data.title}
            </h2>
          </div>
          <p> {data.message}</p>
          <div className="modal-footer">
            {/* TODO: if opponent is still in the room rematch else say opponent let */}
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => requestRematch()}>
              <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
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
