import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { PlayerContext } from "../../context/PlayerContext";

const TicTacToe = () => {
  const { game, placeMark, gameResult } = useContext(GameContext);
  const { player } = useContext(PlayerContext);
  const isPlayer1 = player.uid === game.players.player1.uid ? true : false;
  const isPlayer2 = player.uid === game.players.player2.uid ? true : false;

  const checkLegalMove = (cell) => {
    if (cell.isEmpty && game.turn === "player1" && isPlayer1 && !gameResult) {
      placeMark(game, cell);
    }
    if (cell.isEmpty && game.turn === "player2" && isPlayer2 && !gameResult) {
      placeMark(game, cell);
    }
  };
  return (
    <main className="board tictactoe">
      {game.board.length > 1 &&
        game.board.map((cell) => (
          <button
            key={cell.uid}
            onClick={() => checkLegalMove(cell)}
            className={`cell x-${cell.positionX} y-${cell.positionY} ${
              isPlayer1 ? "player1" : ""
            }${!isPlayer1 ? "player2" : ""}
            ${cell.content === "player1" ? "exes" : ""} ${
              cell.content === "player2" ? "circle" : ""
            }`}
          />
        ))}
    </main>
  );
};
export default TicTacToe;
