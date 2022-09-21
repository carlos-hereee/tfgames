import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GameContext } from "../../context/GameContext";
import { useAnimationFrame } from "../../utils/hooks";

const SnakeGame = () => {
  const { game, gameUpdate } = useContext(GameContext);
  const { player } = useContext(AuthContext);
  const [time, setTime] = useState(0);
  const [inputDirection, setInputDirection] = useState({ x: 0, y: 0 });

  useAnimationFrame((deltaTime) => setTime((prev) => prev + deltaTime));

  useEffect(() => {
    const unSubscribe = async () => {
      if (inputDirection.x !== 0 || inputDirection.y !== 0) {
        await gameUpdate(game, inputDirection, player);
      }
    };
    return () => unSubscribe();
  }, [time]);

  const handleKeyDown = (e) => {
    const controls = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };
    if (game.options.lastInputDirection.y !== 0) return;
    if (game.options.lastInputDirection.x !== 0) return;
    setInputDirection(controls[e.key]);
  };
  // const
  return (
    <main className="board snake-game" tabIndex={0} onKeyDown={handleKeyDown}>
      {game.board.length > 1 &&
        game.board.map((cell) => (
          <div
            key={cell.uid}
            className={`cell x-${cell.x} y-${cell.y} ${cell.content}`}
          />
        ))}
    </main>
  );
};
export default SnakeGame;
