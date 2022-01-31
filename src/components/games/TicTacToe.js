import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { PlayerContext } from "../../context/PlayerContext";

const TicTacToe = ({ isPlayer1, isPlayer2 }) => {
  const { game, placeMark, gameResult } = useContext(GameContext);
  const { player } = useContext(PlayerContext);

  const checkLegalMove = (cell) => {
    if (!gameResult) {
      // console.log(
      //   ` I am ${isPlayer1 ? "player1" : "player2"} my cell ${
      //     cell.isEmpty
      //       ? "empty"
      //       : `has ${
      //           cell.content === player.uid ? "my id " : "my opponents id"
      //         }`
      //   }  its ${game.turn}'s turn,  the winner is: ${gameResult}`
      // );
      // console.log(
      //   ` I am ${isPlayer2 ? "player2" : "player1"} my cell ${
      //     cell.isEmpty
      //       ? "empty"
      //       : `has ${
      //           cell.content === player.uid ? "my id " : "my opponents id"
      //         }`
      //   }  its ${game.turn}'s turn,  the winner is: ${gameResult}`
      // );
      if (cell.isEmpty && game.turn === "player1" && isPlayer1) {
        console.log("mark");
        placeMark(game, cell, player);
      }
      if (cell.isEmpty && game.turn === "player2" && isPlayer2) {
        placeMark(game, cell, player);
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
            className={`cell x-${cell.positionX} y-${cell.positionY} ${
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