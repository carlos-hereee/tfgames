import generator from "project-name-generator";
import defaultAvatar from "../assets/logo.svg";

const PlayerCard = ({ data }) => {
  return (
    <div className="card">
      <div className="avatar-frame">
        <img
          src={data?.avatarSrc || defaultAvatar}
          alt="player avatar"
          className="avatar"
        />
      </div>
      <h3 className="card-title">
        {data?.nickname?.toUpperCase() ||
          data?.username?.toUpperCase() ||
          generator({ words: 2 }).spaced}
      </h3>
      {data?.elo && <p>{data.elo}</p>}
    </div>
  );
};
export default PlayerCard;
