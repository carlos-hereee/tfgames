import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import TicTacToe from "./games/TicTacToe";

export default function Game() {
  const { game } = useContext(GameContext);
  const boards = {
    tictactoe: <TicTacToe />,
  };
  return (
    <section className="game">
      <div className="card">
        <h1>{game.board?.gameName.toUpperCase()}</h1>
        {boards[game.board?.gameName]}
      </div>
    </section>
  );
}
