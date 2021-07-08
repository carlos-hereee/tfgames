import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import TicTacToe from "../components/TicTacToe";
import GameMenu from "../components/GameMenu";
import TTTMenu from "./TTTMenu";
import RandomName from "../components/RandomName";

const Homepage = () => {
  const { player } = useContext(PlayerContext);
  useEffect(() => {
    const findingMatch = async () => {
      const { isInQueue, isPlaying, playerUuid } = player;
      // if there in the queue and not playing
      if (isInQueue && !isPlaying) {
        // find an oponent for player
        // const oponent = queue.filter((item) => playerUuid !== item)[0];
        // if theres an oponent in the queue a match has been found
        //   if (oponent) {
        //     // find the oponent in db
        //     // fill the room data, and start match
        //     const player1 = player;
        //     const player2 = db[oponent];
        //     const startMatch = {
        //       player1: player1,
        //       player2: player2,
        //     };
        //     try {
        //       //
        //       dispatch({ type: "START_MATCH", payload: startMatch });
        //     } catch (error) {
        //       dispatch({ type: "SET_ERROR", payload: "Could not find match" });
        //     }
        //   }
        // }
      }
      findingMatch();
    };
  }, []);
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
