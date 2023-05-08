import PlayerCard from "../components/PlayerCard";
import LobbyOptions from "../components/LobbyOptions";
import { useContext } from "react";
import { AuthContext } from "../utils/context/AuthContext";
import Logger from "../components/Logger";
import { LobbyContext } from "../utils/context/LobbyContext";
import { GameContext } from "../utils/context/GameContext";
import Game from "../components/games/Game";
import { useNavigate } from "react-router-dom";
// import { Prompt } from "react-router-dom";

const Lobby = () => {
  const { player } = useContext(AuthContext);
  const { log, gameName } = useContext(LobbyContext);
  const { gameStart } = useContext(GameContext);
  const navigate = useNavigate();

  if (!gameName) {
    // history.push("/");
    navigate(-1);
  }
  if (gameStart) {
    return <Game />;
  }
  return (
    <main className="container">
      {/* <Prompt message={() => "Are you sure you want to leave this page?"} /> */}
      <div className="lobby-data">
        <PlayerCard data={player} />
        <LobbyOptions name={gameName} />
      </div>
      <div className="logger">
        {log.length > 0 ? (
          <Logger data={log} />
        ) : (
          <div className="log">..Loading</div>
        )}
      </div>
    </main>
  );
};
export default Lobby;
