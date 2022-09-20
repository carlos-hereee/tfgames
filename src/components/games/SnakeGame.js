import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GameContext } from "../../context/GameContext";
import { useAnimationFrame } from "../../utils/hooks";

const SnakeGame = () => {
  const { game, gameUpdate } = useContext(GameContext);
  const { player } = useContext(AuthContext);
  const directionRef = useRef();

  useAnimationFrame((_) => {
    if (directionRef.current !== undefined) {
      console.log("directionRef.current", directionRef.current);
      gameUpdate(game, directionRef.current, player);
      directionRef.current = { x: 0, y: 0 };
    }
  });

  const handleKeyDown = (e) => {
    const controls = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };
    if (game.options.lastInputDirection.y !== 0) return;
    if (game.options.lastInputDirection.x !== 0) return;
    directionRef.current = controls[e.key];
  };
  // const
  return (
    <main
      className="board snake-game"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      // onKeyUp={handleKeyUp}
    >
      {game.board.length > 1 &&
        game.board.map((cell) => (
          <div
            key={cell.uid}
            // onClick={() => checkLegalMove(cell)}
            className={`cell x-${cell.x} y-${cell.y} ${cell.content}`}
            // className={`cell x y ${cell.content}`}
          />
        ))}
    </main>
  );
};
export default SnakeGame;
