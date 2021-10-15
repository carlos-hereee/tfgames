// import { useContext } from "react";
// import { PlayerContext } from "../utlils/PlayerContext";
import shortid from "shortid";
import GameMenu from "../components/GameMenu";
import tictactoeGameboard from "../assets/tictactoeGameboard.svg";
import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import { GameContext } from "../utlils/GameContext";
import { AuthContext } from "../utlils/AuthContext";
import { Link } from "react-router-dom";

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
  const handleClick = (g) => {};
  return (
    <main className="homepage">
      {games.map((game) => (
        <Link
          to={`/lobby?game=${game.name}`}
          key={game.key}
          className="game-card">
          <button
            type="button"
            onClick={() => handleClick(game)}
            className="button-transparent">
            <h2>{game.name.toUpperCase()}</h2>
            <img src={image[game.imageName]} alt={game.imageName} />
          </button>
        </Link>
      ))}
    </main>
  );
};
export default Homepage;
