// import { useContext } from "react";
// import { PlayerContext } from "../utlils/PlayerContext";
import shortid from "shortid";
import GameMenu from "../components/GameMenu";
import tictactoeGameboard from "../assets/tictactoeGameboard.svg";

const games = [
  {
    name: "TicTacToe",
    key: shortid.generate(),
    imageName: "tictactoeGameboard",
  },
];
const Homepage = () => {
  // const { player } = useContext(PlayerContext);
  const image = {
    tictactoeGameboard,
  };
  return (
    <main className="container homepage">
      {games.map((game) => (
        <a href={`/${game.name}`} key={game.key} className="game-card">
          <h2>{game.name}</h2>
          <img src={image[game.imageName]} alt="tictactoe board" />
        </a>
      ))}
    </main>
  );
};
export default Homepage;
