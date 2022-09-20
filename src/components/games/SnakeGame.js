import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GameContext } from "../../context/GameContext";

const SnakeGame = () => {
  const { game, gameUpdate } = useContext(GameContext);
  const { player } = useContext(AuthContext);

  const handleKeyDown = (e) => {
    let { lastInputDirection } = game.options;
    let inputDirection = { x: 0, y: 0 };
    switch (e.key) {
      case "ArrowUp":
        if (lastInputDirection[lastInputDirection.length - 1].y !== 0) break;
        inputDirection = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (lastInputDirection[lastInputDirection.length - 1].y !== 0) break;
        inputDirection = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (lastInputDirection[lastInputDirection.length - 1].x !== 0) break;
        inputDirection = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (lastInputDirection[lastInputDirection.length - 1].x !== 0) break;
        inputDirection = { x: 1, y: 0 };
        break;
      default:
        return inputDirection;
    }
    gameUpdate(game, inputDirection, player);
  };

  return (
    <main className="board snake-game" tabIndex={0} onKeyDown={handleKeyDown}>
      {game.board.length > 1 &&
        game.board.map((cell) => (
          <div
            key={cell.uid}
            // onClick={() => checkLegalMove(cell)}
            className={`cell x-${cell.x} y-${cell.y} ${cell.content}`}
          />
        ))}
    </main>
  );
};
export default SnakeGame;
