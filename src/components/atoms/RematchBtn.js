import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RematchBtn = ({ onBtnClick }) => (
  <button type="button" className="btn btn-secondary" onClick={onBtnClick}>
    <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
    Rematch
  </button>
);
export default RematchBtn;
