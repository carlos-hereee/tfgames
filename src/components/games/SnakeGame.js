import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { AuthContext } from "../../context/AuthContext";

const SnakeGame = () => {
  const { game, placeMark, gameResult } = useContext(GameContext);
  const { player } = useContext(AuthContext);

  const checkLegalMove = (cell) => {
    // if (!gameResult.result) {
    //   if (cell.isEmpty && game.turn === "player1" && isPlayer1) {
    //     placeMark(game, cell, player);
    //   }
    //   if (cell.isEmpty && game.turn === "player2" && isPlayer2) {
    //     placeMark(game, cell, player);
    //   }
    // }
  };
  return (
    <main className="board snake-game">
      {game.board.length > 1 &&
        game.board.map((cell) => (
          <div
            key={cell.uid}
            // onClick={() => checkLegalMove(cell)}
            className={`cell x-${cell.x} y-${cell.y} `}
          />
        ))}
    </main>
  );
};
export default SnakeGame;
/** className={`cell x-${cell.x} y-${cell.y} ${
              isPlayer1 ? "player1" : ""
            }${isPlayer2 ? "player2" : ""}
            ${
              cell.content && game.players.player1.uid === cell.content
                ? "exes"
                : ""
            } ${
              cell.content && game.players.player2.uid === cell.content
                ? "circle"
                : ""
            }`} */
