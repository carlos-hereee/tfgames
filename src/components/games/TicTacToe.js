import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const TicTacToe = () => {
  const { game } = useContext(GameContext);
  console.log(game.board);
  return (
    <main className="board tictactoe">
      {game.board.board.length > 1 &&
        game.board.board.map((cell) => (
          <button
            key={cell.uid}
            disabled={!cell.isEmpty}
            className={`cell x-${cell.positionX} y-${cell.positionY}`}>
            {cell.content}
          </button>
        ))}
    </main>
  );
};
export default TicTacToe;
