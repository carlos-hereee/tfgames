import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import TicTacToe from "../components/TicTacToe";
import GameMenu from "../components/GameMenu";

const Homepage = () => {
  const { player } = useContext(PlayerContext);
  return (
    <main>
      <div className="card">
        {player.isPlaying ? <TicTacToe /> : <GameMenu />}
      </div>
    </main>
  );
};
export default Homepage;
