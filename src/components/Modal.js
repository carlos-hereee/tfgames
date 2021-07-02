import { useEffect, useState } from "react";

const Modal = ({ data }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (data.victor) {
      return setShow(true);
    }
    setShow(false);
  }, [data.victor]);
  return (
    <div
      className={show ? "modal d-block" : "modal d-none"}
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              YOU WON!
            </h5>
          </div>
          <div className="modal-body">...</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShow(false)}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
