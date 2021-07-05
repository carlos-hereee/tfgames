import { Link } from "react-router-dom";
import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import TicTacToe from "../components/TicTacToe";
import GameMenu from "../components/GameMenu";
import TTTMenu from "./TTTMenu";

const Homepage = () => {
  const { player } = useContext(PlayerContext);

  return (
    <main className="container">
      {player.isInQueue ? (
        <div className="card">
          {player.isPlaying ? (
            <TicTacToe />
          ) : (
            <div className="card-body text-center">
              <h3 className="card-title">Seaching for match</h3>
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <GameMenu />
      )}
    </main>
  );
};
export default Homepage;
