import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { copy } from "../utlils/usefulFunction";

const GameInvitationButton = ({ invite }) => (
  <div className="card mb-4 p-1 shadow-sm">
    <div className="card-body">
      <p className="card-text ">Invite a Friend</p>
      <button
        className="btn btn-primary game-invitation"
        onClick={() => copy(invite.invitationCode)}>
        {invite?.invitationCode}
        <FontAwesomeIcon icon={faCopy} />
      </button>
    </div>
  </div>
);
export default GameInvitationButton;
