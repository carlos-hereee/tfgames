import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import Gameover from "./Gameover";
import SnakeGame from "./SnakeGame";
import TicTacToe from "./TicTacToe";
import PlayerCard from "../PlayerCard";

const card = (player, glow) => (
  <div className={glow ? "glow" : "dim"}>
    <PlayerCard data={player} />
  </div>
);
export default function Game() {
  const { game, clock } = useContext(GameContext);
  const boards = {
    tictactoe: <TicTacToe />,
    snakeGame: <SnakeGame />,
  };

  return (
    <section className="game">
      <div className="card">
        <div className="card-header d-flex justify-content-around align-items-center">
          <span>{game.round} </span>
          <h1 className="text-center">{game.gameName?.toUpperCase()} </h1>
          <span>{game.round} </span>
        </div>
        <span>
          Timer: {Math.round((clock.timer - clock.startTime) / 1000) || 0}
        </span>
        {game.gameOver ? <Gameover /> : boards[game.gameName]}
        <footer className="card-footer game-players">
          {card(game.player1, game.turn === "player1")}
          {!game.singlePlayer && card(game.player2, game.turn === "player2")}
        </footer>
      </div>
    </section>
  );
}
