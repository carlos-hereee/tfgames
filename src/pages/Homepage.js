import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import TicTacToe from "../components/TicTacToe";
import GameMenu from "../components/GameMenu";

const Homepage = () => {
  const { player } = useContext(PlayerContext);
  return (
    <main className="container">
      <div className="card">
        {player.isPlaying ? <TicTacToe /> : <GameMenu />}
      </div>
    </main>
  );
};
export default Homepage;
// useEffect(() => {
//   const findingMatch = async () => {
//     const { isInQueue, isPlaying, playerUuid } = player;
//     // if there in the queue and not playing
//     if (isInQueue && !isPlaying) {
//       // find an oponent for player
//       // const oponent = queue.filter((item) => playerUuid !== item)[0];
//       // if theres an oponent in the queue a match has been found
//       //   if (oponent) {
//       //     // find the oponent in db
//       //     // fill the room data, and start match
//       //     const player1 = player;
//       //     const player2 = db[oponent];
//       //     const startMatch = {
//       //       player1: player1,
//       //       player2: player2,
//       //     };
//       //     try {
//       //       //
//       //       dispatch({ type: "START_MATCH", payload: startMatch });
//       //     } catch (error) {
//       //       dispatch({ type: "SET_ERROR", payload: "Could not find match" });
//       //     }
//       //   }
//       // }
//     }
//     findingMatch();
//   };
// }, []);
