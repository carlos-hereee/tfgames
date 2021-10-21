import React, { useContext } from "react";
import TicTacToe from "../components/TicTacToe";
import { GameContext } from "../context/GameContext";

export default function Game() {
  const { game } = useContext(GameContext);
  return (
    <section className="game">
      <div>
        <h1>{game.gameName}</h1>
      </div>
    </section>
  );
}
