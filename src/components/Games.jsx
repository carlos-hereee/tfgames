import { useContext } from "react";
import { LobbyContext } from "../utils/context/LobbyContext";
import { assets } from "../assets";
import ButtonCardItem from "./molecules/buttons/ButtonCardItem";
import NavigationLink from "./molecules/navigation/NavigationLink";
import { AppContext } from "../utils/context/AppContext";
import SectionHeader from "./molecules/SectionHeader";

const Games = () => {
  const { setOptions, setGameName } = useContext(LobbyContext);
  const { games } = useContext(AppContext);

  const gameSettings = (g) => {
    setGameName(g.name);
    setOptions(g.defaultOptions);
  };
  return (
    <section className="container">
      <SectionHeader data={games} />
      <div className="card-container">
        {games.list.map(({ name, key }) => (
          <NavigationLink path={`/lobby?game=${name}`} key={key}>
            <ButtonCardItem
              data={{ link: assets[name], name }}
              click={gameSettings}
            />
          </NavigationLink>
        ))}
      </div>
    </section>
  );
};

export default Games;
