import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";
import { PlayerContext } from "../../context/PlayerContext";

const TicTacToe = () => {
  const { game } = useContext(GameContext);
  const { player } = useContext(PlayerContext);
  const [isPlayer1, setIsPlayer1] = useState(false);
  console.log(player);
  console.log(game);
  useEffect(() => {
    if (game.turn) {
      player.uid === game.players.player1.uid
        ? setIsPlayer1(true)
        : setIsPlayer1(false);
    }
  }, [game.turn]);
  // player 1 is x
  // player 2 is o
  return (
    <main className="board tictactoe">
      {game.board.board.length > 1 &&
        game.board.board.map((cell) => (
          <button
            key={cell.uid}
            disabled={!cell.isEmpty}
            className={`cell x-${cell.positionX} y-${cell.positionY} ${
              game.turn === "player1" && isPlayer1 ? "player1" : "player2"
            }`}
          />
        ))}
    </main>
  );
};
export default TicTacToe;
