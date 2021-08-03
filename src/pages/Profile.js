import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react/cjs/react.development";
import shortid from "shortid";
import PlayerCard from "../components/PlayerCard";
import { PlayerContext } from "../utlils/PlayerContext";
import Frame from "../components/Frame";

const Profile = () => {
  const { player, taunts } = useContext(PlayerContext);
  return (
    <div className="container">
      <PlayerCard data={player} />
      <div class="card">
        <div class="card-header">
          <h3 className="card-title">Taunts/Emojis</h3>
        </div>
        <div class="card-body d-flex justify-content-start">
          {taunts?.map(
            (item) => item && <Frame data={item} key={shortid.generate()} />
          )}
          <a href="/shop">
            <FontAwesomeIcon icon={faPlusSquare} size="10x" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Profile;
