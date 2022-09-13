import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { AuthContext } from "../../context/AuthContext";

const TicTacToe = () => {
  const { game, gameUpdate, gameResult } = useContext(GameContext);
  const { player } = useContext(AuthContext);
  let isPlayer1 = player.uid === game.players?.player1?.uid ? true : false;
  let isPlayer2 = player.uid === game.players?.player2?.uid ? true : false;

  const checkLegalMove = (cell) => {
    if (!gameResult.result) {
      if (cell.isEmpty && game.turn === "player1" && isPlayer1) {
        gameUpdate(game, cell, player);
      }
      if (cell.isEmpty && game.turn === "player2" && isPlayer2) {
        gameUpdate(game, cell, player);
      }
    }
  };
  return (
    <main className="board tictactoe">
      {game.board.length > 1 &&
        game.board.map((cell) => (
          <button
            key={cell.uid}
            onClick={() => checkLegalMove(cell)}
            className={`cell x-${cell.x} y-${cell.y} ${
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
            }`}
          />
        ))}
    </main>
  );
};
export default TicTacToe;
