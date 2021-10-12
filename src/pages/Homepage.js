// import { useContext } from "react";
// import { PlayerContext } from "../utlils/PlayerContext";
import shortid from "shortid";
import GameMenu from "../components/GameMenu";
import tictactoeGameboard from "../assets/tictactoeGameboard.svg";
import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import { GameContext } from "../utlils/GameContext";

const games = [
  {
    name: "tictactoe",
    key: shortid.generate(),
    imageName: "tictactoeGameboard",
  },
];
const Homepage = () => {
  // const { player } = useContext(PlayerContext);
  // const { toLobby } = useContext(GameContext);
  const image = {
    tictactoeGameboard,
  };

  return (
    <main className="homepage">
      {games.map((game) => (
        <a
          href={`/lobby?game=${game.name}`}
          key={game.key}
          className="game-card">
          <h2>{game.name.toUpperCase()}</h2>
          <img src={image[game.imageName]} alt="tictactoe board" />
        </a>
      ))}
    </main>
  );
};
export default Homepage;
