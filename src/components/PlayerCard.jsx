import defaultAvatar from "../assets/logo.svg";
import Hero from "./atoms/Hero";

const PlayerCard = ({ data }) => {
  return (
    <div className="player">
      <div className="avatar-frame">
        <Hero data={{ link: data.avatarSrc || defaultAvatar, name: "player" }} />
      </div>
      <h3 className="card-title">
        {data?.nickname?.dashed?.toUpperCase() || "no name"}
      </h3>
      {data?.elo && <p>{data.elo}</p>}
    </div>
  );
};
export default PlayerCard;
