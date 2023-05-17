import defaultAvatar from "../assets/logo.svg";
import Hero from "./atoms/Hero";

const PlayerCard = ({ data }) => {
  return (
    <div className="player">
      <div className="avatar-frame">
        <Hero
          data={{ link: data.avatarSrc || defaultAvatar, name: data.nickname }}
        />
      </div>
      <h3 className="card-title">{data?.dashed?.toUpperCase() || "no name"}</h3>
    </div>
  );
};
export default PlayerCard;
