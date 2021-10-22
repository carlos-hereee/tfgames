import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";
import { PlayerContext } from "../../context/PlayerContext";

const TicTacToe = () => {
  const { game, placeMark } = useContext(GameContext);
  const { player } = useContext(PlayerContext);
  const [turn, setTurn] = useState(false);
  const isPlayer1 = player.uid === game.players.player1.uid ? true : false;
  const isPlayer2 = player.uid === game.players.player2.uid ? true : false;

  useEffect(() => {
    if (game.turnCount) {
      setTurn(!turn);
    }
  }, [game.turnCount]);
  const checkLegalMove = (cell) => {
    if (game.turn === "player1" && isPlayer1) {
      placeMark(game, cell);
    }
    if (game.turn === "player2" && isPlayer2) {
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
