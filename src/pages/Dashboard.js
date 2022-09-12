// import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
// import shortid from "shortid";
import { PlayerContext } from "../context/PlayerContext";
// import Frame from "../components/Frame";
import { AuthContext } from "../context/AuthContext";
import PlayerCard from "../components/PlayerCard";

const Dashbaord = () => {
  const { player } = useContext(PlayerContext);
  const { logOut } = useContext(AuthContext);
  return (
    <section className="dashboard">
      <PlayerCard data={player} />
      <button className="btn btn-danger" onClick={() => logOut(player)}>
        Log Out
      </button>
    </section>
  );
};
export default Dashbaord;
