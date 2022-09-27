/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GameContext } from "../../context/GameContext";

const SnakeGame = () => {
  const gameRef = useRef(null);
  const { game, gameUpdate, clock } = useContext(GameContext);
  const { player } = useContext(AuthContext);
  const [inputDirection, setInputDirection] = useState({ x: 0, y: 0 });
  const controls = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  };

  useEffect(() => {
    if (!clock.timer) return;
    gameUpdate(game, inputDirection, player);
  }, [clock.timer]);
  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.focus();
    }
  }, [gameRef]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (game.options.lastInputDirection.y !== 0) break;
        setInputDirection(controls[e.key]);
        break;
      case "ArrowDown":
        if (game.options.lastInputDirection.y !== 0) break;
        setInputDirection(controls[e.key]);
        break;
      case "ArrowLeft":
        if (game.options.lastInputDirection.x !== 0) break;
        setInputDirection(controls[e.key]);
        break;
      case "ArrowRight":
        if (game.options.lastInputDirection.x !== 0) break;
        setInputDirection(controls[e.key]);
        break;
      default:
        return inputDirection;
    }
  };
  return (
    <div
      className="grid snake-game"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      // ref={gameRefPassTrough}
      // {...swipeable}
    >
      {game.grid.length > 1 &&
        game.grid.map((cell) => (
          <div
            key={cell.uid}
            className={`cell x-${cell.x} y-${cell.y} ${cell.content}`}
          />
        ))}
    </div>
  );
};
export default SnakeGame;
