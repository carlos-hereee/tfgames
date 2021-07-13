import { faCheckCircle, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react/cjs/react.development";
import { copy } from "../utlils/usefulFunction";
const GameInvitation = ({ invite }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipBoard = (code) => {
    copy(code) ? setCopied(false) : setCopied(true);
  };
  console.log("copy", copied);
  return (
    <div className="card mb-4 p-1 shadow-sm">
      <div className="card-body">
        <p className="card-text ">Invite a Friend </p>
        <button
          className="btn btn-primary game-invitation"
          onClick={() => copyToClipBoard(invite.invitationCode)}>
          {copied ? (
            <>
              {invite.invitationCode}
              <FontAwesomeIcon icon={faCheckCircle} />
            </>
          ) : (
            <>
              {invite.invitationCode}
              <FontAwesomeIcon icon={faCopy} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
export default GameInvitation;
