// import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "../utils/context/AuthContext";
import PlayerCard from "../components/PlayerCard";
import { Link } from "react-router-dom";

const Dashboard = ({ history }) => {
  const { player, logOut } = useContext(AuthContext);
  return (
    <section className="dashboard m-auto">
      <PlayerCard data={player} />
      <nav className="navbar">
        <Link className="nav-link btn btn-success" to={"/"}>
          Play game
        </Link>
        <button className="btn btn-danger" onClick={() => logOut(player, history)}>
          Log Out
        </button>
      </nav>
    </section>
  );
};
export default Dashboard;
