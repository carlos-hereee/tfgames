import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CancelBtn = ({ onBtnClick }) => (
  <button
    type="button"
    className="btn btn-danger"
    onClick={() => onBtnClick("cancel")}>
    <FontAwesomeIcon icon={faTimes} className="mr-2" />
    Cancel
  </button>
);
export default CancelBtn;
