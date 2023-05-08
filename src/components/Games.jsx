import { useContext } from "react";
import { LobbyContext } from "../utils/context/LobbyContext";
import tictactoeGameboard from "../assets/tictactoeGameboard.svg";
import snakeGame from "../assets/snakeGame.jpg";
import { games } from "../utils/fns/usefulFunction";
import ButtonCardItem from "./molecules/buttons/ButtonCardItem";
import NavigationLink from "./molecules/navigation/NavigationLink";

const Games = () => {
  const { setOptions, setGameName } = useContext(LobbyContext);
  const image = { tictactoeGameboard, snakeGame };

  const gameSettings = (g) => {
    setGameName(g.name);
    setOptions(g.defaultOptions);
  };
  return (
    <div className="container">
      {games.map(({ name, key, imageName }) => (
        <NavigationLink path={`/lobby?game=${name}`} key={key}>
          <ButtonCardItem
            data={{ src: image[name], alt: imageName }}
            click={gameSettings}
          />
        </NavigationLink>
      ))}
    </div>
  );
};

export default Games;
