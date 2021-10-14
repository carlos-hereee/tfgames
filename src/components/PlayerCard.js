const PlayerCard = ({ data }) => {
  return (
    <div className="card">
      <div className="avatar-frame">
        <img src={data.avatarSrc} alt="player avatar" className="avatar" />
      </div>
      <h3 className="card-title">{data.username?.toUpperCase()}</h3>
      {data?.elo && <p>{data.elo}</p>}
    </div>
  );
};
export default PlayerCard;
