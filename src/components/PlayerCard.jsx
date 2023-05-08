import defaultAvatar from "../assets/logo.svg";
import Hero from "./atoms/Hero";

const PlayerCard = ({ data, glow }) => {
  return (
    <div className={`player ${glow ? "glow" : "dim"}`}>
      <div className="avatar-frame">
        <Hero data={{ link: data.avatarSrc || defaultAvatar, name: "player" }} />
      </div>
      <h3 className="card-title">{data?.nickname?.toUpperCase() || "no name"}</h3>
      {data?.elo && <p>{data.elo}</p>}
    </div>
  );
};
export default PlayerCard;
