import tictactoeGameboard from "../assets/tictactoeGameboard.svg";
import snakeGame from "../assets/snakeGame.jpg";
import { Link } from "react-router-dom";
import { LobbyContext } from "../context/LobbyContext";
import { useContext } from "react";
import { games } from "../utils/usefulFunction";

const Homepage = () => {
  const { setOptions } = useContext(LobbyContext);
  const image = {
    tictactoeGameboard,
    snakeGame,
  };
  return (
    <main className="homepage">
      {games.map((game) => (
        <Link
          to={`/lobby?game=${game.name}`}
          key={game.key}
          className="game-card">
          <button
            className="btn"
            onClick={() => setOptions(game.defaultOptions)}>
            <h2>{game.name.toUpperCase()}</h2>
            <img
              src={image[game.imageName]}
              alt={game.imageName}
              className="icon-frame"
            />
          </button>
        </Link>
      ))}
    </main>
  );
};
export default Homepage;
