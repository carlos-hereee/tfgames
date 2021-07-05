import { useEffect, useState } from "react";
import TickTackToe from "../components/TickTackToe";
import TTTMenu from "./TTTMenu";

const Homepage = () => {
  const [player, setPlayer] = useState({
    isLoggedIn: false,
    isPlaying: false,
    playerName: "",
    isPlayingComputer: false,
  });

  return (
    <main role="main">
      {player.isPlaying ? (
        <TickTackToe />
      ) : (
        <div className="container">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="card-title">Play </h3>
              <div
                className="d-grid gap-2 col-6 mx-auto"
                aria-label="play vs computer or friend">
                <a
                  href="/vs-computer"
                  className="btn btn-primary btn-lg btn-block">
                  Computer
                </a>
                <a
                  href="/vs-friend"
                  className="btn btn-primary btn-lg btn-block">
                  Friend
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
export default Homepage;
