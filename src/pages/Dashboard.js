import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import shortid from "shortid";
import { PlayerContext } from "../utlils/PlayerContext";
import Frame from "../components/Frame";

const Dashbaord = () => {
  // const { player } = useContext(PlayerContext);
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Taunts/Emojis</h3>
        </div>
        <div className="card-body d-flex justify-content-start">
          {/* {player.taunts?.map(
            (item) => item && <Frame data={item} key={shortid.generate()} />
          )}
          <a href="/shop">
            <FontAwesomeIcon icon={faPlusSquare} size="7x" />
          </a> */}
        </div>
      </div>
    </div>
  );
};
export default Dashbaord;
