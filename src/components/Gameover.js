import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import CancelBtn from "./atoms/CancelBtn";
import RematchBtn from "./atoms/RematchBtn";

export default function Gameover() {
  const { game, gameResult, setRematch, newGame } = useContext(GameContext);
  const { player } = useContext(AuthContext);
  let isPlayer1 = game.player1.uid === player.uid;

  if (gameResult) {
    console.log("gameResult", gameResult);
  }
  return (
    <section className="game-over">
      <h2 className="">{gameResult.title}</h2>
      <div className="game-over-messages">
        <span> {gameResult.message} </span>
      </div>
      <div>
        {!gameResult.leftGame && gameResult.rematch ? (
          <CancelBtn onBtnClick={() => setRematch(game, player)} />
        ) : (
          !game.singlePlayer && (
            <RematchBtn onBtnClick={() => setRematch(game, player)} />
          )
        )}
        {/* {!gameResult.leftGame && game.player2.rematch ? (
          <CancelBtn onBtnClick={setRematch} />
        ) : (
          !isPlayer1 &&
          !game.singlePlayer && <RematchBtn onBtnClick={setRematch} />
        )} */}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => newGame()}>
          New Game
        </button>
      </div>
    </section>
  );
}
