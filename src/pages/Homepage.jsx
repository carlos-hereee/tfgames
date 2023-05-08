import tictactoeGameboard from "../assets/tictactoeGameboard.svg";
import snakeGame from "../assets/snakeGame.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { games } from "../utils/fns/usefulFunction";
import { LobbyContext } from "../utils/context/LobbyContext";

const Homepage = () => {
  const { setOptions, setGameName } = useContext(LobbyContext);
  const image = { tictactoeGameboard, snakeGame };
  const handleGameSettings = (g) => {
    setGameName(g.name);
    setOptions(g.defaultOptions);
  };
  return (
    <main className="homepage">
      {games.map((game) => (
        <Link to={`/lobby?game=${game.name}`} key={game.key} className="game-card">
          <button className="btn" onClick={() => handleGameSettings(game)}>
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
