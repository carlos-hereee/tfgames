import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import GameMenu from "../components/GameMenu";

const Homepage = () => {
  const { player } = useContext(PlayerContext);
  return (
    <main>
      <GameMenu />
    </main>
  );
};
export default Homepage;
