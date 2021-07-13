const PlayerCard = ({ player }) => (
  <div className="card mb-4 p-1 shadow-sm">
    <div className="card-body">
      <h3 className="card-title">{player.playerName}</h3>
      <p className="card-subtitle font-weight-light"> {player.playerWeapon}</p>
      <p className="card-subtitle font-weight-light"> {player.playerUuid}</p>
    </div>
  </div>
);
export default PlayerCard;
