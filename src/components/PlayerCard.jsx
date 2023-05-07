import defaultAvatar from "../assets/logo.svg";

const PlayerCard = ({ data, glow }) => {
  return (
    <div className={`player ${glow ? "glow" : "dim"}`}>
      <div className="avatar-frame">
        <img
          src={data?.avatarSrc || defaultAvatar}
          alt="player avatar"
          className="avatar"
        />
      </div>
      <h3 className="card-title">
        {data?.nickname?.toUpperCase() || "no name"}
      </h3>
      {data?.elo && <p>{data.elo}</p>}
    </div>
  );
};
export default PlayerCard;
