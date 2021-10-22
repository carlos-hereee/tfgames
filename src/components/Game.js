import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import TicTacToe from "./games/TicTacToe";
import PlayerCard from "./PlayerCard";

export default function Game() {
  const { game } = useContext(GameContext);
  const boards = {
    tictactoe: <TicTacToe />,
  };
  return (
    <section className="game">
      <div className="card">
        <h1>{game.gameName.toUpperCase()}</h1>
        <div className="game-content">
          {boards[game.gameName]}
          <div className="game-players">
            <div className={game.turn === "player1" ? "glow" : ""}>
              <PlayerCard data={game.player1} />
            </div>
            <div className={game.turn === "player2" ? "glow" : ""}>
              <PlayerCard data={game.player2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
