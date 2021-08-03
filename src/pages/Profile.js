import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react/cjs/react.development";
import shortid from "shortid";
import PlayerCard from "../components/PlayerCard";
import { PlayerContext } from "../utlils/PlayerContext";

const Profile = () => {
  const { player, taunts } = useContext(PlayerContext);
  console.log("taunts", taunts);
  return (
    <div className="container">
      <PlayerCard data={player} />
      <div class="card">
        <div class="card-header">
          <h3 className="card-title">Taunts/Emojis</h3>
        </div>
        <div class="card-body d-flex justify-content-start">
          {taunts &&
            taunts.map((item) => (
              <div className="card m-2" key={shortid.generate()}>
                taunt
              </div>
            ))}
          <button className="btn btn-secondary m-2">
            <FontAwesomeIcon icon={faPlusSquare} size="10x" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
