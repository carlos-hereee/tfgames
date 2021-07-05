import { Link } from "react-router-dom";
import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import TickTackToe from "../components/TickTackToe";
import GameMenu from "../components/GameMenu";
import TTTMenu from "./TTTMenu";

const Homepage = () => {
  const { player, queueMatch } = useContext(PlayerContext);
  return (
    <main className="container">
      {player.isInQueue ? <TickTackToe /> : <GameMenu />}
    </main>
  );
};
export default Homepage;
