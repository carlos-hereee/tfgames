import { useContext } from "react";
import { LobbyContext } from "../utils/context/LobbyContext";
import { assets } from "../assets";
import ButtonCardItem from "./molecules/buttons/ButtonCardItem";
import NavigationLink from "./molecules/navigation/NavigationLink";
import { AppContext } from "../utils/context/AppContext";

const Games = () => {
  const { setOptions, setGameName } = useContext(LobbyContext);
  const { games } = useContext(AppContext);

  const gameSettings = (g) => {
    setGameName(g.name);
    setOptions(g.defaultOptions);
  };
  return (
    <>
      {games.map(({ name, key }) => (
        <NavigationLink path={`/lobby?game=${name}`} key={key}>
          <ButtonCardItem data={{ link: assets[name], name }} click={gameSettings} />
        </NavigationLink>
      ))}
    </>
  );
};

export default Games;
