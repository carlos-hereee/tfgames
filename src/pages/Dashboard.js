import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import shortid from "shortid";
import { PlayerContext } from "../utlils/PlayerContext";
import Frame from "../components/Frame";
import { AuthContext } from "../utlils/AuthContext";
import PlayerCard from "../components/PlayerCard";

const Dashbaord = () => {
  // const { player } = useContext(PlayerContext);
  const { user } = useContext(AuthContext);
  return (
    <section className="dashboard">
      <PlayerCard data={user} />
    </section>
  );
};
export default Dashbaord;
