import shortid from "shortid";
import tictactoeGameboard from "../assets/tictactoeGameboard.svg";
import snakeGame from "../assets/snakeGame.jpg";
import { Link } from "react-router-dom";

const games = [
  {
    name: "tictactoe",
    key: shortid.generate(),
    imageName: "tictactoeGameboard",
  },
  {
    name: "snakeGame",
    key: shortid.generate(),
    imageName: "snakeGame",
  },
];
const Homepage = () => {
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
          <h2>{game.name.toUpperCase()}</h2>
          <img
            src={image[game.imageName]}
            alt={game.imageName}
            className="icon-frame"
          />
        </Link>
      ))}
    </main>
  );
};
export default Homepage;
