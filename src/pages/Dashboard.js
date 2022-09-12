// import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
// import shortid from "shortid";
import { AuthContext } from "../context/AuthContext";
// import Frame from "../components/Frame";
import PlayerCard from "../components/PlayerCard";

const Dashbaord = ({ history }) => {
  const { player, logOut } = useContext(AuthContext);
  return (
    <section className="dashboard">
      <PlayerCard data={player} />
      <button
        className="btn btn-danger"
        onClick={() => logOut(player, history)}>
        Log Out
      </button>
    </section>
  );
};
export default Dashbaord;
