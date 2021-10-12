import { faCheckCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayerCard = ({ data }) => {
  return (
    <div className="player-card">
      <img src={data.avatarSrc} alt="player avatar" />
      <h3 className="card-title">{data.name.toUpperCase()}</h3>
      <p>Elo: {data.elo}</p>
    </div>
  );
};
export default PlayerCard;
