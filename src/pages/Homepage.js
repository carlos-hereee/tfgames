import shortid from "shortid";
import tictactoeGameboard from "../assets/tictactoeGameboard.svg";
import { Link } from "react-router-dom";

const games = [
  {
    name: "tictactoe",
    key: shortid.generate(),
    imageName: "tictactoeGameboard",
  },
];
const Homepage = () => {
  const image = {
    tictactoeGameboard,
  };
  return (
    <main className="homepage">
      {games.map((game) => (
        <Link
          to={`/lobby?game=${game.name}`}
          key={game.key}
          className="game-card">
          <h2>{game.name.toUpperCase()}</h2>
          <img src={image[game.imageName]} alt={game.imageName} />
        </Link>
      ))}
    </main>
  );
};
export default Homepage;
