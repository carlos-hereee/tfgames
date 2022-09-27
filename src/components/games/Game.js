import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import Gameover from "./Gameover";
import SnakeGame from "./SnakeGame";
import TicTacToe from "./TicTacToe";
import PlayerCard from "../PlayerCard";

const card = (player, glow) => <PlayerCard data={player} glow={glow} />;
export default function Game() {
  const { game } = useContext(GameContext);
  const boards = {
    tictactoe: <TicTacToe />,
    snakeGame: <SnakeGame />,
  };

  return (
    <section className="game">
      <div className="d-flex justify-content-around align-items-center">
        <span>{game.round} </span>
        <h1 className="text-center">{game.gameName?.toUpperCase()} </h1>
        <span>{game.round} </span>
      </div>
      {game.gameOver ? <Gameover /> : boards[game.gameName]}
      <div className="game-players">
        {card(game.player1, game.turn === "player1")}
        {!game.singlePlayer && card(game.player2, game.turn === "player2")}
      </div>
    </section>
  );
}
