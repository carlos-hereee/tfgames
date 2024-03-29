import { useContext } from "react";
import { GameContext } from "../../utils/context/GameContext";
import { AuthContext } from "../../utils/context/AuthContext";

const TicTacToe = () => {
  const { game, gameUpdate, gameResult } = useContext(GameContext);
  const { player } = useContext(AuthContext);
  let isPlayer1 = player.uid === game.player1?.uid;
  let isPlayer2 = player.uid === game.player2?.uid;

  const checkLegalMove = (cell) => {
    if (!gameResult.result) {
      if (!cell.hasContent && game.turn === "player1" && isPlayer1) {
        gameUpdate(game, cell, player);
      }
      if (!cell.hasContent && game.turn === "player2" && isPlayer2) {
        gameUpdate(game, cell, player);
      }
    }
  };
  return (
    <main className="grid tictactoe">
      {game.grid.length > 1 &&
        game.grid.map((cell) => (
          <button
            disabled={gameResult.result}
            key={cell.uid}
            onClick={() => checkLegalMove(cell)}
            className={`cell x-${cell.x} y-${cell.y} ${isPlayer1 ? "player1" : ""}${
              isPlayer2 ? "player2" : ""
            }
            ${cell.content && game.player1.uid === cell.content ? "exes" : ""} ${
              cell.content && game.player2.uid === cell.content ? "circle" : ""
            }`}
          />
        ))}
    </main>
  );
};
export default TicTacToe;
