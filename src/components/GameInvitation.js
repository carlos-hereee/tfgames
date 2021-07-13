const GameInvitation = ({ invite }) => (
  <div className="card mb-4 p-1 shadow-sm">
    <div className="card-body">
      <p className="card-text">Copy to clipbaord</p>
      <button className="btn btn-primary">{invite.invitationCode}</button>
    </div>
  </div>
);
export default GameInvitation;
