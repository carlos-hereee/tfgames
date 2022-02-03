import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import TicTacToe from "./games/TicTacToe";
import PlayerCard from "./PlayerCard";
import { PlayerContext } from "../context/PlayerContext";

export default function Game() {
  const { game } = useContext(GameContext);
  const { player } = useContext(PlayerContext);

  const boards = {
    tictactoe: <TicTacToe />,
  };
  return (
    <section className="game">
      <div className="card">
        <div className="card-header d-flex justify-content-around align-items-center">
          <p> {game.round} </p>
          <h1 className="text-center">{game.gameName?.toUpperCase()} </h1>
          <p> {game.round} </p>
        </div>
        <div className="game-content mt-2">
          <div>{boards[game.gameName]}</div>
          <div className="game-players">
            <div className={game.turn === "player1" ? "glow" : "dim"}>
              <PlayerCard data={game.players.player1} />
            </div>
            <div className={game.turn === "player2" ? "glow" : "dim"}>
              <PlayerCard data={game.players.player2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
